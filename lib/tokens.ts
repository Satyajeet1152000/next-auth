import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuidV4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/passwordReset";

export const generateVerificationToken = async (email: string) => {
    const token = uuidV4();

    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id },
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidV4();

    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordReset.delete({
            where: { id: existingToken.id },
        });
    }

    const passwordResetToken = await db.passwordReset.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return passwordResetToken;
};
