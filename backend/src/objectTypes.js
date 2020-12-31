const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
} = require("graphql");
const moment = require("moment");
const { USER_TYPES } = require("./configs");

const DateType = new GraphQLScalarType({
  name: "DateType",
  description: "Date custom scalar type",
  parseValue(value) {
    let dt = moment(value);
    if (dt.isValid()) {
      return new Date(dt.toISOString());
    } else {
      return null;
    }
  },
  serialize(value) {
    let dt = moment(value);
    if (dt.isValid()) {
      return dt.toISOString();
    } else {
      return null;
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      let dt = moment(ast.value);
      if (dt.isValid()) {
        return new Date(dt.toISOString());
      }
    }
    return null;
  },
});
const RoleEnum = new GraphQLEnumType({
  name: "RoleEnum",
  values: {
    ADMIN: {
      value: USER_TYPES["ADMIN"],
    },
    USER: {
      value: USER_TYPES["USER"],
    },
  },
});
const UserType = new GraphQLObjectType({
  name: "UserType",
  type: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: RoleEnum },
    active: { type: GraphQLString },
    createdEvents: { type: new GraphQLList(EventType) },
    attendedEvents: { type: new GraphQLList(EventType) },
  }),
});
const eventLocationFields = {
  name: { type: GraphQLString },
  lat: { type: GraphQLFloat },
  lang: { type: GraphQLFloat },
};
const EventLocationInputType = new GraphQLInputObjectType({
  name: "EventLocationInputType",
  type: "EventLocationInputType",
  fields: () => ({ ...eventLocationFields }),
});
const EventLocationType = new GraphQLObjectType({
  name: "EventLocationType",
  type: "EventLocationType",
  fields: () => ({ ...eventLocationFields }),
});
const EventType = new GraphQLObjectType({
  name: "EventType",
  type: "EventType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: EventLocationType },
    ticketQuantity: { type: GraphQLInt },
    startDate: { type: DateType },
    endDate: { type: DateType },
    active: { type: GraphQLBoolean },
    creator: { type: UserType },
    attendance: { type: new GraphQLList(UserType) },
  }),
});

module.exports = {
  UserType,
  RoleEnum,
  EventLocationInputType,
  EventLocationType,
  EventType,
  DateType,
};
