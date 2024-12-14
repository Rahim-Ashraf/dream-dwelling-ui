import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        return profile
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials?.email });

          if (foundUser && credentials?.password) {
            const match = await bcrypt.compare(
              credentials?.password,
              foundUser.password
            );

            if (match) {
              delete foundUser.password;

              return {
                id: foundUser._id || "",
                name: foundUser.userName,
                email: foundUser.email,
                role: foundUser.role,
                image: foundUser.photoURI
              };
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
