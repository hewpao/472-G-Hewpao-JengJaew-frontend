import { LoginResponseDTO } from "@/dtos/Auth";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: LoginResponseDTO;
    access_token?: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    access_token?: string;
    user?: LoginResponseDTO;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
