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
    senderStreetAddress: z.string().min(1, {
        message: "Please fill out this field",
    }),
    senderCity: z.string().min(1, {
        message: "Please fill out this field",
    }),
    senderPostCode: z.string().min(1, {
        message: "Please fill out this field",
    }),
    senderCountry: z.string().min(1, {
        message: "Please fill out this field",
    }),
    clientName: z.string().min(1, {
        message: "Please fill out this field",
    }),
    clientEmail: z.string().email({
        message: "Please fill out this field",
    }),
    clientStreetAddress: z.string().min(1, {
        message: "Please fill out this field",
    }),
    clientCity: z.string().min(1, {
        message: "Please fill out this field",
    }),
    clientPostCode: z.string().min(1, {
        message: "Please fill out this field",
    }),
    clientCountry: z.string().min(1, {
        message: "Please fill out this field",
    }),
    invoiceDueDate: z.date({
        required_error: "A due date is required.",
    }),
    payementTerms: z.string().min(1, {
        message: "Please fill out this field",
    }),
    projectDescription: z.string().min(1, {
        message: "Please fill out this field",
    }),
    items: z.array(
        z.object({
            id: z.string().optional(),
            name: z.string().min(1, {
                message: "Please fill out this field",
            }),
            quantity: z.number().min(1, {
                message: "Please fill out this field",
            }),
            price: z.number().min(1, {
                message: "Please fill out this field",
            }),
        })
    ),
    status: z.string().min(1, {
        message: "Please fill out this field",
    }),
});
