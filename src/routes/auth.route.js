const passport = require("passport");
const router = require("express").Router();
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("../schema/auth.schema");

router.all(
  "/login",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      passport.authenticate("login", (err, user, info) => {
        if (err) {
          return res.json(err);
        }
        if (!user) {
          return res.json("login:break");
        }
        if (user) {
          req.logIn(user, (err) => {
            if (err) {
              return res.json("login:break");
            }
            return next();
          });
        }
      })(req, res, next);
    } else {
      next();
    }
  },
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

router.all("/logout", (req, res, next) => {
  req.logOut();
  res.json({ message: "user:logout" });
});

module.exports.router = router;
