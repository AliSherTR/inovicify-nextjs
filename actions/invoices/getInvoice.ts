"use server";

import { db } from "@/lib/db";

export const getInvoices = async () => {
    try {
        return await db.invoice.findMany();
    } catch (error) {
        return;
    }
};
