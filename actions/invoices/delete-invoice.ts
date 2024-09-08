"use server";

import { db } from "@/lib/db";

export const deleteInvoice = async (id: string) => {
    try {
        await db.invoice.delete({
            where: {
                id,
            },
        });
    } catch {}
};
