'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const prisma = new PrismaClient();

const WithdrawSchema = z.object({
    amount: z.coerce.number().min(50000, "Minimum withdrawal is IDR 50,000"),
    bankName: z.string().min(3, "Bank Name is required"),
    accountNumber: z.string().min(5, "Account Number is required"),
});

export async function requestWithdrawal(userId, data) {
    try {
        const validated = WithdrawSchema.parse(data);

        // Check balance
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.commissionBalance < validated.amount) {
            return { success: false, message: "Insufficient balance" };
        }

        // Deduct balance (Atomic Transaction needed ideally, but for now sequential)
        await prisma.user.update({
            where: { id: userId },
            data: {
                commissionBalance: { decrement: validated.amount }
            }
        });

        // Log the transaction request (In real app, create a Transaction/WithdrawRequest record)
        await prisma.log.create({
            data: {
                userId,
                action: 'WITHDRAW_REQUEST',
                details: `Requested IDR ${validated.amount} to ${validated.bankName} - ${validated.accountNumber}`
            }
        });

        revalidatePath('/dashboard/admin/wallet');
        return { success: true, message: "Withdrawal requested successfully!" };
    } catch (error) {
        console.error("Withdrawal failed:", error);
        return { success: false, message: error.message || "Failed to process withdrawal" };
    }
}
