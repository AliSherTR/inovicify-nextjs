import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        return await db.verficationToken.findFirst({
            where: {
                email,
            },
        });
    } catch {
        return null;
    }
};

export const getVerificationTokenByToken = async (token: string) => {
    try {
        return await db.verficationToken.findFirst({
            where: {
                token,
            },
        });
    } catch {
        return null;
    }
};
