import NextAuth from "next-auth";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id as string);

            // prevent signin wihtout email verification
            if (!existingUser?.emailVerified) return false;

            return true;
        },
        async session({ session, user, token }) {
            if (!session.user) return session;
            session.userId = token.sub as string;
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            token.userId = token.sub;

            return token;
        },
    },
    session: { strategy: "jwt" },
    ...authConfig,
});
