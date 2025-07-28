import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: string;
      role: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user_id: string;
    role: string;
    email: string;
  }
}
