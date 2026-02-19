'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const prisma = new PrismaClient();

const ServiceSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    basePrice: z.coerce.number().min(0, "Price cannot be negative"),
    category: z.enum(["SOFTWARE", "DESIGN", "WRITING", "MARKETING", "OTHER"]),
    adminCommission: z.coerce.number().min(0, "Commission cannot be negative"),
    adminCommissionType: z.enum(["FIXED", "PERCENTAGE"]),
});

export async function createService(data) {
    try {
        const validated = ServiceSchema.parse(data);

        await prisma.service.create({
            data: {
                ...validated,
                isActive: true
            }
        });

        revalidatePath('/dashboard/owner/services');
        return { success: true, message: "Service created successfully!" };
    } catch (error) {
        console.error("Failed to create service:", error);
        return { success: false, message: error.message || "Failed to create service" };
    }
}

export async function updateService(id, data) {
    try {
        const validated = ServiceSchema.partial().parse(data);

        await prisma.service.update({
            where: { id },
            data: validated
        });

        revalidatePath('/dashboard/owner/services');
        return { success: true, message: "Service updated successfully!" };
    } catch (error) {
        console.error("Failed to update service:", error);
        return { success: false, message: "Failed to update service" };
    }
}

export async function toggleServiceStatus(id, currentStatus) {
    try {
        await prisma.service.update({
            where: { id },
            data: { isActive: !currentStatus }
        });

        revalidatePath('/dashboard/owner/services');
        return { success: true };
    } catch (error) {
        return { success: false, message: "Failed to toggle status" };
    }
}
