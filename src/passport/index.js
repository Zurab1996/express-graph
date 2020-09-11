const passport = require("passport");
const { localStrategy } = require("./loginStrategy");
const User = require("../Models/User");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use("login", localStrategy);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    User.findById(user._id, function (err, user) {
      done(err, user);
    });
  });
};
