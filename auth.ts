import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

export const { handlers, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
        //we are using jwt strategy instead of database bcz it doesn't work with db session and db session doesn't work on edge, and thats why we are not using Session Schema in prisma.schema
        strategy: "jwt",
    },
    // callbacks are extremly useful to trigger specific nextAuth actions like signin, signout etc.
    ...authConfig,
});
