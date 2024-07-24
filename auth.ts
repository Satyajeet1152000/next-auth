import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
    callbacks: {
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
