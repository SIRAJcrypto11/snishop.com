import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = registerSchema.parse(body);

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with default role
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                membershipTier: "BRONZE",
                snishopBalance: 0,
                platformCredits: 0,
            },
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(
            { message: 'User created successfully', user: userWithoutPassword },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: 'Validation failed', errors: error.issues },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: 'Something went wrong during registration' },
            { status: 500 }
        );
    }
}
