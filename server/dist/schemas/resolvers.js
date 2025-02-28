import { signToken } from "../services/auth.js";
import { AuthenticationError } from "../services/auth.js";
import { User } from "../models/index.js";
const resolvers = {
    Query: {
        getSingleUser: async (_parent, _args, context) => {
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
        createUser: async (_parent, args, _context) => {
            //args is for req.body & req.params when in a resolver
            const user = await User.create(args);
            if (!user) {
                return null;
            }
            const token = signToken(user.username, user.password, user._id);
            return { token, user };
        },
        login: async (_parent, args, _context) => {
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
