import { connectMongo } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongo();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          console.log("user", user);

          return user;

        } catch (error) {
          console.log("Error", error);
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      // console.log("jwt callback", { token, user, session })

      if (user) {
        return {
          ...token,
          id: user._id,
          gender: user.gender
        }
      }

      return token
    },
    async session({ session, token, user }) {
      // console.log("session callback", { session, token, user })
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            gender: token.gender
          }
        }
        return session;
      }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  site: process.env.NEXTAUTH_URL
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };