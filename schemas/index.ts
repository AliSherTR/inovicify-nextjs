import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "password is required",
    }),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Full name is required",
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const VerificationSchema = z.object({
    token: z.string(),
});
