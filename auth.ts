import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "./data/user";
import { AdapterUser } from "next-auth/adapters";

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login", // whatever something goes wrong then next auth redirect user to this page
        error: "/auth/error", // and when something breaks then its shows this custom error page
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow Oauth without email verification
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id as string);

            // prvent sign in without email verification
            if (!existingUser?.emailVerified) return false;

            // TODO:   Add 2FA check

            // const current_user = user as AdapterUser;

            // if (!current_user.emailVerified) {
            //     return false;
            // }

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
