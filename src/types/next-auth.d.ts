import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession{
    user: {
      /** The user's postal address. */
      name: string
      email: string
      image: string
      role: string
    }
  }
  interface User extends DefaultUser{
  
      /** The user's postal address. */
      name: string
      email: string
      image: string
      role: string
    
  }
}