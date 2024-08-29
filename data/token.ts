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
