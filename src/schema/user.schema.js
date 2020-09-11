const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { me } = require("../modules/user/controller");
const {
  myEvent,
  myEvents,
  attendEvent,
  updateEvent,
} = require("../modules/event/controller");

const userAccessUserQuery = new GraphQLObjectType({
  type: "userAccessUserQuery",
  name: "userAccessUserQuery",
  description: "user access query",
  fields: () => ({
    myEvent,
    myEvents,
    me,
  }),
});

const userAccessUserMutation = new GraphQLObjectType({
  type: "userAccessUserMutation",
  name: "userAccessUserMutation",
  description: "user access mutation",
  fields: () => ({
    attendEvent,
    updateEvent,
  }),
});

const schema = new GraphQLSchema({
  query: userAccessUserQuery,
  mutation: userAccessUserMutation,
});

module.exports.schema = schema;
