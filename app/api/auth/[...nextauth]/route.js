import User from "@models/UserModel";
import generateWebToken from "@utils/auth/generateWebToken";
import environment from "@utils/environment";
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

      //MARK: CHECK WHETHER USER IS PRESENT OR NOT
      const findUser = await User.findOne({
        OAuthId: id,
      });

      if (findUser) {
        const token = generateWebToken({
          id: findUser._id,
          name: findUser.name,
          image: findUser.image,
          email: findUser.email,
          role: findUser.role,
        });

        cookies().set("token", token, {
          httpOnly: true,
          maxAge: environment.JWT_EXPIRES_IN, // in milliseconds
        });

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
        name: createUser.name,
        image: createUser.image,
        email: createUser.email,
        role: createUser.role,
      });

      cookies().set("token", token, {
        httpOnly: true,
        maxAge: environment.JWT_EXPIRES_IN, // in milliseconds
      });

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
