'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function updateUserRole(userId, isAdmin, isOwner) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                isOwner: isOwner,
                // If making admin, we might need to assign a role ID, but for now simplistic boolean/role logic
                // The schema has `adminRoleId`, so typically we'd assign that. 
                // For simplicity in this iteration:
                // isOwner = true -> GOD MODE
                // isAdmin (implicit via role) -> Standard Admin.
            }
        });

        revalidatePath('/dashboard/owner/users');
        return { success: true, message: "User role updated" };
    } catch (error) {
        return { success: false, message: "Failed to update role" };
    }
}

export async function getUserDetails(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                adminRole: true,
                orders: {
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    include: { service: true }
                },
                logs: {
                    take: 5,
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        return user;
    } catch (error) {
        return null;
    }
}
