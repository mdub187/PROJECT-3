import { signToken } from "../services/auth.js";
import { AuthenticationError } from "../services/auth.js";
import { User } from "../models/index.js";

const resolvers = {
  Query: {
    getSingleUser: async (_parent: any, _args: any, context: any) => {
      const foundUser = await User.findOne({
        username: context.user.username,
      });
      if (!foundUser) {
        throw new AuthenticationError("Authentication Error");
      }
      return foundUser;
    },
    // getResource: {},
  },
  Mutation: {
    createUser: async (_parent: any, args: any, _context: any) => {
      const user = await User.create(args);

      if (!user) {
        return null;
      }
      const token = signToken(user.username, user.password, user._id);
      return { token, user };
    },
    login: async (_parent: any, args: any, _context: any) => {
      const user = await User.findOne({
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!user) {
        return null;
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        return null;
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    // deleteResource: {},
    // addResource: {},
    // updateResource: {},
    // updateUser: {},
  },
};

export default resolvers;
