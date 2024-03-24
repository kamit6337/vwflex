// pages/api/auth/[...auth].js
import nextConnect from "next-connect";
import passport from "passport";
import { GoogleStrategy } from "passport-google-oauth20";
import cookieSession from "cookie-session";
import environment from "@utils/environment";

const handler = nextConnect();

passport.use(
  new GoogleStrategy(
    {
      clientID: environment.GOOGLE_CLIENT_ID,
      clientSecret: environment.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Here you can handle user authentication logic
      return done(null, profile);
    }
  )
);

handler.use(
  cookieSession({
    name: "session",
    keys: ["your-secret-key"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

handler.use(passport.initialize());
handler.use(passport.session());

handler.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

handler.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    console.log("req", req);
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

export default handler;
