import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials?.email === "user@one.com" && credentials?.password === "aa") {
          return { id: "1", name: "rahim", email: "rahim@gmail.com", role: "user" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
