// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession`, and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's unique ID. */
            userId?: string; // Extend the user object to include userId
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        userId: string; // Also extend the User object
    }

    interface JWT {
        userId: string; // Add userId to the JWT as well
    }
}
