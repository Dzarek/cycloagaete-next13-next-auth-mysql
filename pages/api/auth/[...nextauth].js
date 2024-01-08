import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "../../../lib/db";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // find out user from db
        const adminProfile = await query({
          query: "SELECT * FROM admin WHERE id = 1",
          values: [],
        });

        if (
          email !== adminProfile[0].email ||
          password !== adminProfile[0].password
        ) {
          throw new Error("invalid credentials");
        }
        // if everything is fine
        return {
          id: "",
          name: "Admin",
          email: adminProfile[0].email,
          image: null,
        };
      },
    }),
  ],
  // callbacks: {
  //   async session({ token, session }) {
  //     if (token) {
  //       // set session here
  //       (session.name = token.name), (session.image = "");
  //     }
  //     return session;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/",
    signOut: "/",
  },
};

export default NextAuth(authOptions);
