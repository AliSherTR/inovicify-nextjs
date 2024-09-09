"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getInvoices = async () => {
    const session = await auth();

    try {
        return await db.invoice.findMany({
            where: {
                userId: session?.user.userId,
            },
            include: {
                items: true,
            },
        });
    } catch (error) {
        return;
    }
};
