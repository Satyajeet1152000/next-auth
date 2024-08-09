import { db } from "@/lib/db";

export const get2AFTokenByToken = async (token: string) => {
    try {
        const Token = await db.twoAFToken.findUnique({
            where: { token },
        });

        return Token;
    } catch (error) {
        return null;
    }
};

export const get2AFTokenByEmail = async (email: string) => {
    try {
        const Token = await db.twoAFToken.findFirst({
            where: { email },
        });

        return Token;
    } catch (error) {
        return null;
    }
};
