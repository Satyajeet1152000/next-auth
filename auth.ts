import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "./data/user";
import { AdapterUser } from "next-auth/adapters";

export const { handlers, auth, signIn, signOut } = NextAuth({
    callbacks: {
        async signIn({ user }) {
            const current_user = user as AdapterUser;

            if (!current_user.emailVerified) {
                return false;
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: {
        //we are using jwt strategy instead of database bcz it doesn't work with db session and db session doesn't work on edge, and thats why we are not using Session Schema in prisma.schema
        strategy: "jwt",
    },
    // callbacks are extremly useful to trigger specific nextAuth actions like signin, signout etc.
    ...authConfig,
});
