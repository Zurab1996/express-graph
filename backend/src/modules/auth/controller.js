const { UserType } = require("../../objectTypes");

const login = {
  type: UserType,
  resolve: (parent, args, req) => {
    return req.user;
  },
};

module.exports = {
  login,
};
