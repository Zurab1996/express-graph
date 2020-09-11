const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLError,
} = require("graphql");
const Event = require("../../Models/Event");
const { EventType, EventLocationInputType } = require("../../objectTypes");
const User = require("../../Models/User");
const { createEventValidation } = require("./validation");
const { nestedUser, nestedEventObj } = require("../../nestedSchemaServices");

const event = {
  name: "event",
  type: EventType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args, req) => {
    try {
      const { _id } = args;
      if (!_id) {
        return new GraphQLError("_id:required");
      } else {
        const eventDoc = await Event.findById(_id);
        const nextEvent = nestedEventObj(eventDoc._doc);
        return nextEvent;
      }
    } catch (e) {
      console.error(e);
      return new GraphQLError("be:error");
    }
  },
};

const events = {
  name: "events",
  type: new GraphQLList(EventType),
  resolve: async () => {
    try {
      const getEvents = await Event.find();
      return getEvents.map((eventDoc) => {
        const nextEvent = nestedEventObj(eventDoc._doc);
        return nextEvent;
      });
    } catch (e) {
      console.error(e);
      return new GraphQLError("be:error");
    }
  },
};

const createEvent = {
  name: "createEvent",
  type: EventType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(EventLocationInputType) },
    ticketQuantity: { type: new GraphQLNonNull(GraphQLInt) },
    startDate: { type: new GraphQLNonNull(GraphQLString) },
    endDate: { type: new GraphQLNonNull(GraphQLString) },
    active: { type: GraphQLBoolean, defaultValue: true },
  },
  resolve: async (parent, args, req) => {
    try {
      const {
        name,
        location,
        ticketQuantity,
        startDate,
        endDate,
        active,
      } = args;
      const errors = createEventValidation({
        name,
        location,
        ticketQuantity,
        startDate,
        endDate,
        active,
      });
      if (errors.length) {
        return new GraphQLError(errors);
      } else {
        const newEvent = await Event.create({
          name,
          location,
          ticketQuantity,
          startDate,
          endDate,
          active,
          creator: req.user._id,
        }).then(async (eventDoc) => {
          await User.findByIdAndUpdate(
            req.user._id,
            {
              $push: {
                createdEvents: eventDoc,
              },
            },
            { new: true, useFindAndModify: false }
          );
          const nextEvent = nestedEventObj(eventDoc._doc);
          return nextEvent;
        });
        return newEvent;
      }
    } catch (e) {
      console.error(e);
      return new GraphQLError("be:error");
    }
  },
};

const myEvent = {
  name: "myEvent",
  type: EventType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args, req) => {
    try {
      const { _id } = args;
      if (!_id) {
        return new GraphQLError("_id:required");
      } else {
        const eventDoc = await Event.findById(_id);
        if (eventDoc.creator === req.user._id) {
          const nextEvent = nestedEventObj(eventDoc._doc);
          return nextEvent;
        } else {
          return null;
        }
      }
    } catch (e) {
      console.error(e);
      return new GraphQLError("be:error");
    }
  },
};

const myEvents = {
  name: "myEvent",
  type: EventType,
  resolve: (parent, args, req) => {},
};

const attendEvent = {
  name: "attendEvent",
  type: EventType,
  args: {
    eventId: { type: GraphQLID },
  },
  resolve: async (parent, args, req) => {
    try {
      const { eventId } = args;
      if (!eventId) {
        return new GraphQLError("eventId:required");
      } else {
        const currentEvent = await Event.findOneAndUpdate(
          {
            _id: eventId,
            ticketQuantity: { $gt: 0 },
            startDate: { $gt: new Date().toISOString() },
          },
          {
            $inc: { ticketQuantity: -1 },
            $push: { attendance: req.user._id },
          },
          { new: true, useFindAndModify: false }
        );
        const nextEvent = nestedEventObj(currentEvent._doc);
        return nextEvent;
      }
    } catch (e) {
      console.error(e);
      return new GraphQLError("be:error");
    }
  },
};

const updateEvent = {};

const updateMyEvent = {};

module.exports = {
  event,
  events,
  createEvent,
  myEvent,
  myEvents,
  attendEvent,
  updateEvent,
  updateMyEvent,
};
