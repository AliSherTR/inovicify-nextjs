"use server";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validated = RegisterSchema.safeParse(values);

    if (!validated.success) {
        return { error: "Invalid data" };
    }

    const { name, email, password } = validated.data;

    await db.user.create({
        data: {
            name,
            email,
            password,
        },
    });

    return { success: "Account created successfully " };
};
