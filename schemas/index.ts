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

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(1, {
        message: "Please use a strong password",
    }),
});

export const NewInvoiceSchema = z.object({
    senderStreetAddress: z.string().min(1),
    senderCity: z.string().min(2),
    senderPostCode: z.string().min(1),
    senderCountry: z.string().min(1),
    clientName: z.string().min(1, {
        message: "name is required",
    }),
    clientEmail: z.string().email({
        message: "email is required",
    }),
    clientStreetAddress: z.string({
        message: "street address is required",
    }),
    clientCity: z.string({
        message: "City is required",
    }),
    clientPostCode: z.string({
        message: "post code is required",
    }),
    clientCountry: z.string({
        message: "country is required",
    }),
    invoiceDueDate: z.date({
        message: "Due date is required",
    }),
    payementTerms: z.string({
        message: "Payement terms are required",
    }),
    projectDescription: z.string({
        message: "description is required",
    }),
});
