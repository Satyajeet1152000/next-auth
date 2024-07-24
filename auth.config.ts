// Next-auth use Edge conmpatibility and by default Prisma does not. Thatswhy we are not able not use callbacks and events in auth.ts file.
// So for this issue there is an solution which is that we are going to use auth.config.ts as middleware.

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import { compare } from "bcryptjs";

export default {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            authorize: async (credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) return null;

                    const passwordMatch = await compare(
                        password,
                        user.password
                    );

                    if (!passwordMatch) throw new Error("Password Not Match.");

                    return user;
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
