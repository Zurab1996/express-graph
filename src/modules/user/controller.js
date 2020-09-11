const {
  GraphQLID,
  GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");
const bcrypt = require("bcrypt");
const { USER_TYPES } = require("../../configs");
const { UserType, RoleEnum } = require("../../objectTypes");
const User = require("../../Models/User");

// queries
const user = {
  name: "user",
  type: UserType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args, req) => {
    try {
      const { _id } = args;
      if (!_id) {
        return new GraphQLError("_id:required");
      } else {
        const user = await User.findById(_id);
        return user;
      }
    } catch (err) {
      console.error(err);
      return new GraphQLError("be:error");
    }
  },
};
const users = {
  name: "users",
  type: new GraphQLList(UserType),
  args: {
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: RoleEnum },
    active: { type: GraphQLBoolean },
  },
  resolve: async (parent, args, req) => {
    try {
      const { userName, email, role, active } = args;
      // filter builder
      const filter = [];
      if (userName) {
        filter.push({ userName });
      }
      if (email) {
        filter.push({ email });
      }
      if (role) {
        filter.push({ role });
      }
      if (active !== "" && typeof active !== "undefined") {
        filter.push({ active });
      }
      let filteredUsers = null;
      if (filter.length) {
        filteredUsers = User.find({ $or: filter });
      } else {
        filteredUsers = User.find();
      }
      return filteredUsers;
    } catch (err) {
      console.error(err);
      return new GraphQLError("be:error");
    }
  },
};

// mutations
const createUser = {
  name: "createUser",
  type: UserType,
  args: {
    userName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: RoleEnum, defaultValue: USER_TYPES["USER"] },
    active: { type: GraphQLBoolean, defaultValue: true },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args, req) => {
    console.log(req.user);
    try {
      const { userName, email, role, active, password } = args;
      // validation
      const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!userName) return new GraphQLError("userName:required");
      if (!email) return new GraphQLError("email:required");
      if (!reEmail.test(email)) return new GraphQLError("email:format");
      if (!role) return new GraphQLError("role:required");
      if (!Object.values(USER_TYPES).includes(role))
        return new GraphQLError("role:format");
      if (active === null) return new GraphQLError("active:required");
      if (typeof active !== "boolean") return new GraphQLError("active:format");
      if (!password) return new GraphQLError("password:required");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        userName,
        email,
        role,
        active,
        password: hashedPassword,
      });
      return newUser;
    } catch (err) {
      if (err.code === 11000) {
        return new GraphQLError("email:duplicate");
      } else {
        console.error(err);
        return new GraphQLError("be:error");
      }
    }
  },
};

const me = {};

const updateUser = {};

module.exports = {
  user,
  users,
  createUser,
};
