"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/email";
import { generatePasswordResetToken } from "@/lib/password-reset-token";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validated = ResetSchema.safeParse(values);

    if (!validated.success) return { error: "Invalid data" };

    const { email } = validated.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Invalid email" };
    }

    const resetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(email, resetToken.token);
    return { success: "HEELO" };
};
