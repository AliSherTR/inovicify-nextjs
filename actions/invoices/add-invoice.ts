"use server";
import * as z from "zod";

import { NewInvoiceSchema } from "@/schemas";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const addInvoice = async (values: z.infer<typeof NewInvoiceSchema>) => {
    const session = await auth();

    if (!session?.user.userId) return { error: "Please login again" };
    const validateFields = NewInvoiceSchema.safeParse(values);
    if (validateFields.success) {
        const {
            senderStreetAddress,
            senderCity,
            senderCountry,
            senderPostCode,
            clientName,
            clientEmail,
            clientStreetAddress,
            clientCity,
            clientCountry,
            clientPostCode,
            invoiceDueDate,
            payementTerms,
            projectDescription,
            items,
        } = validateFields.data;

        const itemsData =
            items?.map((item) => ({
                ...item,
                quantity: Number(item.quantity),
            })) || [];
        await db.invoice.create({
            data: {
                senderAddress: senderStreetAddress,
                senderCity,
                senderPostCode,
                senderCountry,
                receiverName: clientName,
                receiverEmail: clientEmail,
                receiverAddress: clientStreetAddress,
                receiverCity: clientCity,
                receiverPostCode: clientPostCode,
                receiverCountry: clientCountry,
                userId: session?.user?.userId,
                status: "PENDING",
                invoiceDate: new Date(),
                dueDate: invoiceDueDate,
                paymentTerms: payementTerms,
                projectDescription,
                items: {
                    create: itemsData.length ? itemsData : undefined,
                },
            },
        });
    }

    return { success: "Invoice Created Successfully" };
};
