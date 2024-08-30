import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";

export default {
    pages: {
        signIn: "/auth/error",
        // error: "/auth/error",
    },
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);

                    if (!user || !user.password) return null;

                    const matchedPasswords = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (matchedPasswords) return user;
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
