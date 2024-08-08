// Added by: Dawson
// Date: 2024-08-07
// Middleware for NextAuth
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home",
    "/pages/:path*",
    "/api/auth",
    "/api/records/:path*",
    "/api/register/:path*",
    "/api/results/:path*",
    "/api/samples/:path*",
    "/api/tests/:path*",
    "/api/users/:path*",
  ],
};
