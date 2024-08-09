import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuidV4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/passwordReset";
import crypto from "crypto";

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

export const generate2AFToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000); // 100_000 === 100000 both are equal. _ use for 0s count

    const expires = new Date(new Date().getTime() + 3600 * 1000);
};
