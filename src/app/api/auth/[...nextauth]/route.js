import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/utils/mongoose";

import User from "@/models/usrs";
import bcript from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        eCorreo: {
          label: "Email",
          type: "email",
          placeholder: "email@domain.com",
        },
        pwd: {
          label: "Password",
          type: "password",
          placeholder: "**********",
        },
      },
      async authorize(credentials, req) {
        await connectDB();

        const userFound = await User.findOne({
          eCorreo: credentials.eCorreo,
        }).select("+pwd");
        console.log(userFound)
        if (!userFound) {
          throw new Error("Invalid credentials");
        }
        const passwordMatch = await bcript.compare(
          credentials.pwd,
          userFound.pwd
        );
        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }
        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
    pages: {
      signIn: "/login",
    },
});

export { handler as GET, handler as POST };
