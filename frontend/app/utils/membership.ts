import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const TIERS_THRESHOLD = {
    SILVER: 100000,
    GOLD: 500000,
    PLATINUM: 2000000,
    DIAMOND: 10000000,
};

export async function updateUserTier(userId: string, currentBalance: number) {
    let newTier = 'BRONZE';

    if (currentBalance >= TIERS_THRESHOLD.DIAMOND) newTier = 'DIAMOND';
    else if (currentBalance >= TIERS_THRESHOLD.PLATINUM) newTier = 'PLATINUM';
    else if (currentBalance >= TIERS_THRESHOLD.GOLD) newTier = 'GOLD';
    else if (currentBalance >= TIERS_THRESHOLD.SILVER) newTier = 'SILVER';

    // Update DB only if changed? Or always ensuring consistency.
    // Let's just update.
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { membershipTier: newTier },
        });
        return newTier;
    } catch (error) {
        console.error('Failed to update tier:', error);
        return null;
    }
}
