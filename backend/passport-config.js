// passportConfig.js
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

export default function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "No user found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
