// in this file we have to check project is production or development phase using if block. If we not then it initialize too many prisma client and give error in console. This happend due to nextjs fires hot reload, so global vaariable will not be affected by hot reload.

import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// this line check if prisma client is already created and sotred in golbal db variable then it user global prisma variable or if global prisma is not available or application is running first time then it create new PrismClient.
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
