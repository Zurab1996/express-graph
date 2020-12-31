const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { login } = require("../modules/auth/controller");

const authorizedQuery = new GraphQLObjectType({
  type: "authQuery",
  name: "authQuery",
  description: "auth query",
  fields: () => ({
    login,
  }),
});

const schema = new GraphQLSchema({
  query: authorizedQuery,
});

module.exports.schema = schema;
