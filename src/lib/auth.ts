import { RefreshAccessToken } from "@/services/auth.services";
import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) {
          throw new Error("No credentials provided.");
        }

        const { email, password } = credentials;

        const user = await fetch(`${process.env.API_URL}/auth/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then(async (res) => {
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.error);
            }
            const data = await res.json();
            return {
              id: data.data.id,
              first_name: data.data.first_name,
              email: data.data.email,
              access_token: data.data.access_token,
              refresh_token: data.data.refresh_token,
              expiresIn: data.data.expires_in,
            };
          })
          .catch((err) => {
            throw new Error(err.message);
          });

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: user.access_token,
          accessTokenExpires: user.expires_in,
          refreshToken: user.refresh_token,
          user,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return RefreshAccessToken(token);
    },

    async session({ token, session }) {
      if (token) {
        session.user = token.user as Session["user"];
        session.user.access_token = token.accessToken as string;
      }
      return session;
    },
  },
};