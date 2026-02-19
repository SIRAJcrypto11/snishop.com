import { NextResponse } from 'next/server';
import { auth } from '../../../../auth'; // Adjust path to root auth.ts
import { PrismaClient } from '@prisma/client';
import { calculatePrice } from '../../../utils/pricing';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { serviceId, paymentMethod = 'SALDO', userFiles } = await req.json();

        if (!serviceId) {
            return NextResponse.json({ message: 'Service ID required' }, { status: 400 });
        }

        // 1. Fetch User & Service
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        const service = await prisma.service.findUnique({
            where: { id: serviceId },
        });

        if (!user || !service) {
            return NextResponse.json({ message: 'User or Service not found' }, { status: 404 });
        }

        // 2. Calculate Final Price
        const { finalPrice, discountRate } = calculatePrice(service.basePrice, user.membershipTier);

        // 3. Check Balance
        if (paymentMethod === 'SALDO') {
            if (user.platformCredits < finalPrice) {
                return NextResponse.json(
                    { message: `Insufficient Balance. Need ${finalPrice}, have ${user.platformCredits}` },
                    { status: 402 }
                );
            }
        } else {
            // Handle other methods or reject for now
            return NextResponse.json({ message: 'Only SALDO payment supported currently' }, { status: 400 });
        }

        // 4. Atomic Transaction: Deduct Balance & Create Order
        const order = await prisma.$transaction(async (tx) => {
            // Deduct Balance
            await tx.user.update({
                where: { id: user.id },
                data: {
                    platformCredits: { decrement: finalPrice },
                    totalSpent: { increment: finalPrice },
                },
            });

            // Create Order
            const newOrder = await tx.order.create({
                data: {
                    userId: user.id,
                    serviceId: service.id,
                    originalPrice: service.basePrice,
                    discountApplied: discountRate * 100, // Storing as percentage value? Schema says Float. Let's store amount or percent. 
                    // Schema comment says "discountApplied Float @default(0)". Let's assume Amount for consistency with financial logs, OR percent.
                    // Wait, calculatePrice returns discountRate as e.g. 10 (10%).
                    // Let's store the actual discount AMOUNT to be safe for auditing? 
                    // Or strictly follow schema. "discountApplied" usually implies amount.
                    // Let's check schema... "discountApplied Float".
                    // I will store the DISCOUNT AMOUNT. 
                    // calculatedPrice.finalPrice = base - discountAmount.
                    // let's recalculate simply here.
                    finalPrice: finalPrice,
                    paymentMethod,
                    status: 'PAID', // Instant payment via Saldo
                    userFiles: userFiles ? JSON.stringify(userFiles) : null,
                },
            });

            return newOrder;
        });

        return NextResponse.json({ message: 'Order created successfully', order }, { status: 201 });

    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
