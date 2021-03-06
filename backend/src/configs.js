const MONGO_URL = process.env.MONGO_USER && process.env.MONGO_PASSWORD ?
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&authSource=${process.env.MONGO_AUTH_SERVICE_DB}` : 
  `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/`


// types
const USER_TYPES = { USER: "user", ADMIN: "admin" };

module.exports = {
  USER_TYPES,
  MONGO_URL
};
