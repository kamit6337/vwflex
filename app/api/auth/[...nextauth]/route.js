import environment from "@utils/environment";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: environment.GOOGLE_CLIENT_ID,
      clientSecret: environment.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    maxAge: 1 * 24 * 60 * 60, // 1 days
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const { id, name, email, image } = user;
      //   {
      //     id: '100289689752036183575',
      //     name: 'Amit Kumar',
      //     email: 'amitwick007@gmail.com',
      //     image: 'https://lh3.googleusercontent.com/a/ACg8ocJWe26SGsT1n1Nb784od0h3b9tTaVIjYsd2mqC9SXfqOQYPcw=s96-c'
      //   }

      const { provider, expires_at } = account;
      //provider = "google"
      //expires_at = 1716659883

      const { iat, exp } = profile;
      //   iat: 1716656284,
      //   exp: 1716659884

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      //   console.log("session session", session);
      const { user, expires } = session;
      //  only after callback : if successful {
      //     user: {
      //       name: 'Amit Kumar',
      //       email: 'amitwick007@gmail.com',
      //       image: 'https://lh3.googleusercontent.com/a/ACg8ocJWe26SGsT1n1Nb784od0h3b9tTaVIjYsd2mqC9SXfqOQYPcw=s96-c'
      //     },
      //     expires: '2024-05-26T16:58:06.778Z'
      //   }

      //   console.log("session token", token);
      // only after callback : if successful  session token {
      //     name: 'Amit Kumar',
      //     email: 'amitwick007@gmail.com',
      //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocJWe26SGsT1n1Nb784od0h3b9tTaVIjYsd2mqC9SXfqOQYPcw=s96-c',
      //     sub: '100289689752036183575',
      //     iat: 1716656284,
      //     exp: 1719248284,
      //     jti: 'b2e2b377-46d9-4037-b4cc-2279400e7bbe'
      //   }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      //   console.log("jwt user", user); //same as above signin user
      //   console.log("jwt token", token); //same as above signin user
      //   console.log("jwt account", account); //same as above signin account
      //   console.log("jwt profile", profile); //same as above signin profile

      // after callback url
      //only jwt token gives value while others are undefined
      // jwt token =    {
      //     name: 'Amit Kumar',
      //     email: 'amitwick007@gmail.com',
      //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocJWe26SGsT1n1Nb784od0h3b9tTaVIjYsd2mqC9SXfqOQYPcw=s96-c',
      //     sub: '100289689752036183575',
      //     iat: 1716656284,
      //     exp: 1719248284,
      //     jti: 'b2e2b377-46d9-4037-b4cc-2279400e7bbe'
      //   }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
