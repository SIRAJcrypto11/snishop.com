import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Use a global prisma instance to avoid "too many connections" in dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            where: { isActive: true },
            orderBy: { category: 'asc' },
        });

        return NextResponse.json(services);
    } catch (error) {
        console.error('Failed to fetch services:', error);
        return NextResponse.json(
            { message: 'Failed to fetch services' },
            { status: 500 }
        );
    }
}
