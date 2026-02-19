export const authConfig = {
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && nextUrl.pathname === '/login') {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (session.user) {
                session.user.isOwner = token.isOwner as boolean;
                session.user.membershipTier = token.membershipTier as string;
                session.user.adminRole = token.adminRole as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.isOwner = user.isOwner;
                token.membershipTier = user.membershipTier;
                // Fetch Admin Role name if needed, or pass it if included in user object
                // NOTE: In authorize(), we fetch user. We need to include adminRole in that fetch or here.
                // For efficiency, let's assume authorize returns it or we fetch it here if needed.
                // But 'user' in jwt callback comes from 'authorize'.
                // We will update 'authorize' to include specific fields if necessary, 
                // but Prisma returns the whole object by default unless selected.
                // However, relations like 'adminRole' need to be explicitly included in Prisma query.
                token.adminRole = user.adminRoleId;
            }
            return token;
        }
    },
    providers: [], // Configured in auth.ts
};
