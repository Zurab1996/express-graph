const { graphqlHTTP } = require("express-graphql");
const router = require("express").Router();
const { schema } = require("../schema/admin.schema");
const { USER_TYPES } = require("../configs");

router.all(
  "/",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.role === USER_TYPES["ADMIN"]) {
        next();
      } else {
        res.json({ message: "user:unauthorized" });
      }
    } else {
      res.json({ message: "user:unauthorized" });
    }
  },
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

module.exports.router = router;
