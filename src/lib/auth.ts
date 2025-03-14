import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axiosInstance from "./axiosInstance";
import { LoginResponseDTO } from "@/dtos/Auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: { access_type: "offline", prompt: "consent" },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const response = await axiosInstance.post<LoginResponseDTO>(
            "/auth/login",
            {
              email: credentials.email,
              password: credentials.password,
            },
          );

          if (response.status === 200) {
            return response.data;
          }

          return null;
        } catch (error) {
          console.error("Credentials authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        return true;
      } else if (account?.provider === "credentials") {
        return !!user;
      }
      return false;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        if (account.provider === "google") {
          try {
            const response = await axiosInstance.post<LoginResponseDTO>(
              "/auth/login/oauth",
              {
                provider: account.provider,
                id_token: account.id_token!,
              },
            );

            if (response.status === 200) {
              token.access_token = response.data.access_token;
              token.user = response.data;
              return token;
            }
          } catch (error) {
            console.error("Failed to login with OAuth:", error);
            throw new Error("Failed to login with OAuth");
          }
        } else if (account.provider === "credentials") {
          const res = user as LoginResponseDTO;
          token.access_token = user.access_token;
          token.user = res;
          return token;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.user = {
        ...session.user,
        ...token.user,
      };

      return session;
    },
  },
  pages: {
    signIn: "/", // Use your custom sign-in page
    error: "/auth/error", // Error page
  },
});

