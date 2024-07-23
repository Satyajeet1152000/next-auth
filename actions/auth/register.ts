"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { hash } from "bcryptjs";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPass = await hash(password, 10);

    const exixtingUser = await getUserByEmail(email);
    if (exixtingUser) {
        return { error: "Emaill already in use." };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPass,
        },
    });

    // Send verification token email

    return { success: "User created." };
};
