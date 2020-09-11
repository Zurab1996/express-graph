const { GraphQLObjectType, GraphQLSchema } = require("graphql");
// const { user, users, createUser } = require("../modules/user/controller");
const { myEvent, attendEvent } = require("../modules/event/controller");

const userAccessUserQuery = new GraphQLObjectType({
  type: "userAccessUserQuery",
  name: "userAccessUserQuery",
  description: "user access query",
  fields: () => ({
    myEvent,
  }),
});

const userAccessUserMutation = new GraphQLObjectType({
  type: "userAccessUserMutation",
  name: "userAccessUserMutation",
  description: "user access mutation",
  fields: () => ({
    attendEvent,
  }),
});

const schema = new GraphQLSchema({
  query: userAccessUserQuery,
  mutation: userAccessUserMutation,
});

module.exports.schema = schema;
