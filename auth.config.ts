// Next-auth use Edge conmpatibility and by default Prisma does not. Thatswhy we are not able not use callbacks and events in auth.ts file.
// So for this issue there is an solution which is that we are going to use auth.config.ts as middleware.

import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

export default {
    providers: [Github],
} satisfies NextAuthConfig;
