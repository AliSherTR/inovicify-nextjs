"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validated = RegisterSchema.safeParse(values);

    if (!validated.success) {
        return { error: "Invalid data" };
    }

    const { name, email, password } = validated.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) return { error: "User already exists" };
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return { success: "Account created successfully " };
};
