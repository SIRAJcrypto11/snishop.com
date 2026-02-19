import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Demo users sebagai fallback ketika database tidak tersedia di Vercel
const DEMO_USERS = [
  {
    id: 'demo-owner-001',
    name: 'Admin SNISHOP',
    email: 'admin@snishop.com',
    plainPassword: 'admin123',
    image: null,
    isOwner: true,
    membershipTier: 'PLATINUM',
    adminRoleId: null,
    walletAddress: null,
    snishopBalance: 10000,
    platformCredits: 500,
    commissionBalance: 0,
    totalSpent: 0,
  },
  {
    id: 'demo-user-002',
    name: 'User Demo',
    email: 'user@snishop.com',
    plainPassword: 'admin123',
    image: null,
    isOwner: false,
    membershipTier: 'BRONZE',
    adminRoleId: null,
    walletAddress: null,
    snishopBalance: 0,
    platformCredits: 0,
    commissionBalance: 0,
    totalSpent: 0,
  },
];

async function getUserFromDB(email: string) {
  try {
    const { PrismaClient } = require('@prisma/client');
    const globalForPrisma = global as any;
    if (!globalForPrisma.__prisma) {
      globalForPrisma.__prisma = new PrismaClient();
    }
    const prisma = globalForPrisma.__prisma;
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error('DB not available, using demo users:', (error as Error).message);
    return null;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        // Coba dari database dulu
        const dbUser = await getUserFromDB(email);
        if (dbUser) {
          const passwordsMatch = await bcrypt.compare(password, dbUser.password);
          if (passwordsMatch) return dbUser as any;
          console.log('Invalid password for DB user');
          return null;
        }

        // Fallback ke demo users dengan plain text comparison
        const demoUser = DEMO_USERS.find(u => u.email === email);
        if (demoUser && demoUser.plainPassword === password) {
          const { plainPassword, ...userWithoutPassword } = demoUser;
          return userWithoutPassword as any;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
