import { db } from "@/lib/db";

export const get2AFConfirmationByUserId = async (userId: string) => {
    try {
        const twoAFConirmation = await db.twoAFConfirmation.findUnique({
            where: { userId },
        });

        return twoAFConirmation;
    } catch (error) {
        return null;
    }
};
