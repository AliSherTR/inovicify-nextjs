"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const resetPassword = async (
    value: z.infer<typeof NewPasswordSchema>,
    token: string
) => {
    if (!token) return { error: "No token found" };
    const validated = NewPasswordSchema.safeParse(value);

    if (!validated.success) {
        return { error: "Invalid data" };
    }

    const { password } = validated.data;

    const existingToken = await db.passwordResetToken.findFirst({
        where: {
            token,
        },
    });
    if (!existingToken) return { error: "Invalid Token" };
    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id },
    });

    return { success: "Password updated!" };
};
