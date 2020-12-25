const LoginStrategy = require("passport-custom").Strategy;
const bcrypt = require("bcrypt");
const User = require("../Models/User");

const localStrategy = new LoginStrategy(async (req, done) => {
  const { email, password } = req.query;
  
  const user = await User.findOne({ email });
  if (user) {
    if (!password) {
      done({ message: "password:required" });
    } else {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        console.log(user);
        done(null, user);
      } else {
        done({ message: "user:not_exists" });
      }
    }
  } else {
    done({ message: "user:not_exists" });
  }
});

module.exports.localStrategy = localStrategy;
