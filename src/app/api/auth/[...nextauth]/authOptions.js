
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Swal from "sweetalert2";

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
          return { id: "1", name: "rahim" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to the dashboard on successful login
      if (url.startsWith(baseUrl)) return url;
      return "http://localhost:3000/"; // Default redirect
    },
  },
  pages: {
    signIn: "/signin", // Custom login page
  },
};

export default authOptions;
