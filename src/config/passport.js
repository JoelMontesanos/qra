const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user_model');

passport.use(
  new LocalStrategy(
    {
      usernameField: "mail",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ mail: email });

      if (!user) {
        return done(null, false, { message: "Usuario no encontrado." });
      }

      // Match Password's User
      const isMatch = await user.matchPasswords(password);
      if (!isMatch)
        return done(null, false, { message: "Contraseña incorrecta" });
      
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});