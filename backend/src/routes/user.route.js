const { graphqlHTTP } = require("express-graphql");
const router = require("express").Router();
const { schema } = require("../schema/user.schema");

router.all(
  "/",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json({ message: "user:unauthorized" });
    }
  },
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

module.exports.router = router;
