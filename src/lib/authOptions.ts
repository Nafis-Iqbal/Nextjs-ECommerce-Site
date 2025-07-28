import { JWT } from "next-auth/jwt";
import bcrypt from "bcrypt";
import { Session, User, Account, Profile } from "next-auth";
import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

import prismadb from "@/prisma/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prismadb),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password required");
        }

        const user = await prismadb.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password_hashed) {
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password_hashed
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.user_name ?? "Guest_User",
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({token, user, account, profile, isNewUser,
    } : {
      token: JWT, user?: User, account?: Account | null, profile?: Profile, isNewUser?: boolean
    }) {
      if (user) {
        token.user_id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },

    async session({session, token
    } : {
      session: Session, token: JWT
    }) {
      session.user.user_id = token.user_id;
      session.user.role = token.role;
      session.user.email = token.email;
      return session;
    },

    async redirect({url, baseUrl,
    } : {
      url: string, baseUrl: string
    }): Promise<string> {
      return '/'; // force homepage
    },

    async signIn({ user, account}) {
      if (account?.provider === "google") {
        const existingUser = await prismadb.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: "google",
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (!existingUser) {
          const userByEmail = await prismadb.user.findUnique({
            where: { email: user.email },
          });

          if (userByEmail) {
            await prismadb.account.create({
              data: {
                userId: userByEmail.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                type: account.type,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
              },
            });

            return true;
          }
        }
      }

      return true;
    }
  }, 
  events: {
    async createUser({ user }: {user: User}) {
      await prismadb.user.update({
        where: { id: user.id },
        data: { user_name: user.name },
      });
    },
  }
};