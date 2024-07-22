// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      first_name: string;
      email: string;
      access_token: string;
      refresh_token: string;
      expires_in: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    first_name: string;
    email: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }
}
