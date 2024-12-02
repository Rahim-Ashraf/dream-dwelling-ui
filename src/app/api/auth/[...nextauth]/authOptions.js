
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials?.email === "rahim@gmail.com" && credentials?.password === "aa") {
          return { id: "1", name: "rahim", email: "rahim@gmail.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom login page
  },
};

export default authOptions;
