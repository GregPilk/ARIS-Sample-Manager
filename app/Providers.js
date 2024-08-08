// Added by: Dawson
// Date: 2024-08-07
// Provide the AuthProvider to the app
"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
