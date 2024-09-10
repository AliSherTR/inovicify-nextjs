"use server";

import * as z from "zod";
import { NewInvoiceSchema } from "@/schemas";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { invoiceStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const editInvoice = async (
    values: z.infer<typeof NewInvoiceSchema>,
    id: string
) => {
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
            status,
        } = validateFields.data;

        const itemsData =
            items?.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: Number(item.quantity),
                price: item.price,
            })) || [];

        const existingItems = await db.item.findMany({
            where: { invoiceId: id },
        });

        const existingItemIds = existingItems.map((item) => item.id);
        const newItems = itemsData.filter(
            (item) => !existingItemIds.includes(item?.id)
        );
        const updatedItems = itemsData.filter((item) =>
            existingItemIds.includes(item?.id)
        );
        const itemsToDelete = existingItems
            .filter(
                (item) => !itemsData.some((newItem) => newItem.id === item.id)
            )
            .map((item) => item.id);

        // Delete removed items
        if (itemsToDelete.length > 0) {
            await db.item.deleteMany({
                where: { id: { in: itemsToDelete } },
            });
        }

        // Update existing items
        await Promise.all(
            updatedItems.map((item) =>
                db.item.update({
                    where: { id: item.id },
                    data: {
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                    },
                })
            )
        );

        // Create new items
        if (newItems.length > 0) {
            await db.item.createMany({
                data: newItems.map((item) => ({
                    name: item.name || "",
                    quantity: item.quantity || 0,
                    price: item.price || 0,
                    invoiceId: id,
                })),
            });
        }

        // Update the invoice
        await db.invoice.update({
            where: { id },
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
                status: status as invoiceStatus,
                invoiceDate: new Date(),
                dueDate: invoiceDueDate,
                paymentTerms: payementTerms,
                projectDescription,
            },
        });
    }

    revalidatePath(`/invoices/${id}`);

    return { success: "Invoice Updated Successfully" };
};
