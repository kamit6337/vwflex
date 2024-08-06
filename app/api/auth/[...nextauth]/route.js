import User from "@models/UserModel";
import cookieOptions from "@utils/auth/cookieOptions";
import generateWebToken from "@utils/auth/generateWebToken";
import environment from "@utils/environment";
import connectToDB from "@utils/mongoose/connectToDB";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: environment.GOOGLE_CLIENT_ID,
      clientSecret: environment.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    maxAge: environment.JWT_EXPIRES_IN / 1000, // in Seconds
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const { id, name, email, image } = user;

      const bool = await connectToDB();

      if (!bool) {
        return false;
      }

      //MARK: CHECK WHETHER USER IS PRESENT OR NOT
      const findUser = await User.findOne({
        email,
      });

      if (findUser) {
        const token = generateWebToken({
          id: findUser._id,
          role: findUser.role,
        });

        cookies().set("token", token, cookieOptions);

        return true;
      }

      //MARK: CREATE NEW USER
      const { provider, expires_at } = account;

      const createUser = await User.create({
        name,
        email,
        image,
        OAuthId: id,
        OAuthProvider: provider,
      });

      const token = generateWebToken({
        id: createUser._id,
        role: createUser.role,
      });

      cookies().set("token", token, cookieOptions);

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
