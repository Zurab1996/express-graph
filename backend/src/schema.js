const { GraphQLObjectType } = require("graphql");
const { user, users } = require("./controller");

const rootQuery = new GraphQLObjectType({
  type: "rootQuery",
  description: "root query",
  fields: () => ({}),
});

const rootMutation = new GraphQLObjectType({
  type: "rootMutation",
  description: "root mutation",
  fields: () => ({}),
});

module.exports = {
  rootQuery,
  rootMutation,
};
