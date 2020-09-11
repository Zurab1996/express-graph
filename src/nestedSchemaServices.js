const User = require("./Models/User");
const Event = require("./Models/Event");

// nested event population
const nestedEventObj = (event) => {
  return {
    ...event,
    creator: nestedUser.bind(this, event.creator),
    attendance: nestedUsers.bind(this, event.attendance),
  };
};
const nestedEvents = async (eventIds) => {
  const events = await Event.find({ _id: { $in: eventIds } });
  events.map((event) => {
    const nexTestedEventObj = nestedEventObj(event);
    return nexTestedEventObj;
  });
  return events;
};

// nested user population
const nestedUserObj = (user) => {
  return {
    ...user,
    createdEvents: nestedEvents.bind(this, user.createdEvents),
    attendedEvents: nestedEvents.bind(this, user.attendedEvents),
  };
};
const nestedUser = async (userId) => {
  const user = await User.findById(userId);
  const nexTestedUserObj = nestedUserObj(user._doc);
  return nexTestedUserObj;
};
const nestedUsers = async (userIds) => {
  const users = await User.find({ _id: { $in: userIds } });
  users.map((user) => {
    const nexTestedUserObj = nestedUserObj(user);
    return nexTestedUserObj;
  });
  return users;
};

module.exports = {
  nestedEvents,
  nestedUser,
  nestedUsers,
  nestedEventObj,
  nestedUserObj,
};
