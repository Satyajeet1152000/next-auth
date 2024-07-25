"use server";

import { getPasswordResetTokenByEmail } from "@/data/passwordReset";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetPasswordSchema } from "@/schemas";
import email from "next-auth/providers/email";
import { z } from "zod";

export const resetPassword = async (
    values: z.infer<typeof ResetPasswordSchema>
) => {
    const validateFields = ResetPasswordSchema.safeParse(values);

    if (!validateFields.success) return { error: "Invalid email." };

    const { email } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) return { error: "Email  not found." };

    // generate Email and verification token

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return { success: "Reset email sent." };
};
