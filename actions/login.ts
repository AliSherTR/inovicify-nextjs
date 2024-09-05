"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/verification-token";
import { sendVerificationEmail } from "@/lib/email";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validated = LoginSchema.safeParse(values);

    if (!validated.success) return { error: "Invalid data" };

    const { email, password } = validated.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "No user found!" };
    }

    if (!existingUser.emailVerified) {
        const token = await generateVerificationToken(
            existingUser?.email ? existingUser.email : ""
        );
        await sendVerificationEmail(token.email, token.token);
        return { success: "Verfication email sent" };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "http://localhost:3000/invoices",
        });
        return { success: "Email sent successfully" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
    }
};
