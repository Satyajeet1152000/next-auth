/**
 * An array of routes that are accessible to public.
 * These routes do not require authentication.
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/email-verification",
    // "/auth/reset-password",
    // "/auth/new-password",
];

/**
 * An array of routes that are used for authentication.
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset-password",
    "/auth/new-password",
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path for logging in.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
