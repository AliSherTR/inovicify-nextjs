"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validated = LoginSchema.safeParse(values);

    if (!validated.success) return { error: "Invalid data" };

    const { email, password } = validated.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "No user found!" };
    }

    const comparePassword = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!comparePassword) {
        return { error: "Invalid Email or Password" };
    }

    return { success: "Email sent successfully" };
};
