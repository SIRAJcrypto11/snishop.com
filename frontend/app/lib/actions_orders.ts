'use server';

import { auth } from '../../auth'; // Adjust path
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function claimJob(orderId) {
    const session = await auth();
    if (!session || !session.user) return { error: 'Unauthorized' };

    // Check if user has permission (AdminRole check or isOwner)
    // For MVP, if they have access to the dashboard, we assume they can claim.
    // Better: if (session.user.adminRole || session.user.isOwner) ...

    try {
        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) return { error: 'Order not found' };
        if (order.status !== 'PAID') return { error: 'Order is not available for claiming' };

        await prisma.order.update({
            where: { id: orderId },
            data: {
                status: 'PROCESSING',
                handledById: session.user.id,
            },
        });

        revalidatePath('/dashboard/admin/jobs');
        revalidatePath('/dashboard/admin/jobs/active');
        return { success: true };
    } catch (error) {
        console.error('Claim Job Error:', error);
        return { error: 'Failed to claim job' };
    }
}

export async function completeJob(orderId, resultFileUrl) {
    const session = await auth();
    if (!session || !session.user) return { error: 'Unauthorized' };

    try {
        // 1. Fetch Order & Service to calculate commission
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { service: true }
        });

        if (!order) return { error: 'Order not found' };
        if (order.handledById !== session.user.id && !(session.user as any).isOwner) {
            return { error: 'You are not the handler of this job' };
        }
        if (order.status !== 'PROCESSING') return { error: 'Order is not in processing state' };

        // 2. Calculate Commission
        let commissionAmount = 0;
        if (order.service.adminCommissionType === 'PERCENTAGE') {
            commissionAmount = (order.finalPrice * order.service.adminCommission) / 100;
        } else {
            commissionAmount = order.service.adminCommission;
        }

        // 3. Transaction: Update Order & Credit Handler
        await prisma.$transaction(async (tx) => {
            // Update Order
            await tx.order.update({
                where: { id: orderId },
                data: {
                    status: 'COMPLETED',
                    resultFiles: JSON.stringify([resultFileUrl]), // Array of URLs
                    commissionPaid: commissionAmount,
                },
            });

            // Credit Handler
            await tx.user.update({
                where: { id: session.user.id },
                data: {
                    commissionBalance: { increment: commissionAmount },
                },
            });
        });

        revalidatePath('/dashboard/admin/jobs/active');
        revalidatePath('/dashboard/admin/commission'); // Assuming this exists or will exist
        return { success: true };

    } catch (error) {
        console.error('Complete Job Error:', error);
        return { error: 'Failed to complete job' };
    }
}
