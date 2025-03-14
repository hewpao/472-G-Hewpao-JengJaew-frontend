import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axiosInstance from "./axiosInstance";
import { LoginResponseDTO, LoginWithCredentialsRequestDTO } from "@/dtos/Auth";

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
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          
          const response = await axiosInstance.post<LoginResponseDTO>("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });
          
          if (response.status === 200) {
            // Return the user object with needed data
            return {
              id: response.data.user?.id,
              email: credentials.email,
              name: response.data.user?.name,
              access_token: response.data.access_token,
              ...response.data
            };
          }
          
          return null;
        } catch (error) {
          console.error("Credentials authorization error:", error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        return true;
      } else if (account?.provider === "credentials") {
        // This will be called after the authorize function succeeds
        return !!user;
      }
      return false;
    },
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        if (account.provider === "google") {
          try {
            const response = await axiosInstance.post<LoginResponseDTO>("/auth/login/oauth", {
              provider: account.provider,
              id_token: account.id_token!,
            });
            
            if (response.status === 200) {
              token.access_token = response.data.access_token;
              token.user = response.data.user;
              return token;
            }
          } catch (error) {
            console.error("Failed to login with OAuth:", error);
            throw new Error("Failed to login with OAuth");
          }
        } else if (account.provider === "credentials") {
          // For credentials, the user object already contains what we need from authorize()
          token.access_token = user.access_token;
          token.user = user;
          return token;
        }
      }
      
      // Return previous token if the access token has not expired yet
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
    signIn: '/', // Use your custom sign-in page
    error: '/auth/error', // Error page
  },
  session: {
    strategy: "jwt",
  },
});