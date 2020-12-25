const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { user, users, createUser } = require("../modules/user/controller");
const { createEvent } = require("../modules/event/controller");

const adminAccessUserQuery = new GraphQLObjectType({
  type: "adminAccessUserQuery",
  name: "adminAccessUserQuery",
  description: "admin access query",
  fields: () => ({
    user,
    users
  }),
});

const adminAccessUserMutation = new GraphQLObjectType({
  type: "adminAccessUserMutation",
  name: "adminAccessUserMutation",
  description: "admin access mutation",
  fields: () => ({
    createUser,
    createEvent,
  }),
});

const schema = new GraphQLSchema({
  query: adminAccessUserQuery,
  mutation: adminAccessUserMutation,
});

module.exports.schema = schema;
