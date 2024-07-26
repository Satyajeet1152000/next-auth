"use server";

import { getPasswordResetTokenByToken } from "@/data/passwordReset";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { hash } from "bcryptjs";
import { z } from "zod";

export const setNewPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token: string | null
) => {
    if (!token) return { error: "Missing Token." };

    const validateFields = NewPasswordSchema.safeParse(values);
    if (!validateFields.success) return { error: "Invalid fields." };

    const { password } = validateFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) return { error: "Invalid Token." };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { error: "Token has expired." };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { error: "Email does not exist" };

    const hashedPassword = await hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: hashedPassword,
        },
    });

    await db.passwordReset.delete({
        where: {
            id: existingToken.id,
        },
    });

    return { success: "Password is updated." };
};
