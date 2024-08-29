import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        return await db.user.findUnique({
            where: {
                email,
            },
        });
    } catch {
        return;
    }
};

export const getUserById = async (id: string) => {
    try {
        return await db.user.findUnique({
            where: {
                id,
            },
        });
    } catch {
        return;
    }
};
