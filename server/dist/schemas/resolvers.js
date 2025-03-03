import { signToken } from "../services/auth.js";
import { AuthenticationError } from "../services/auth.js";
import User from "../models/User.js";
import Resource from "../models/Resource.js";
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
        createResource: async (_parent, { title, description, url }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            try {
                const newResource = new Resource({
                    title,
                    description,
                    url,
                });
                const savedResource = await newResource.save();
                console.log(`Successfully added resource with ID: ${savedResource._id}`);
                return savedResource;
            }
            catch (error) {
                console.error("Error adding resource:", error);
                throw new Error("Error adding resource");
            }
        },
        deleteResource: async (_parent, { _id }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            console.log(`Attempting to delete resource with ID: ${_id}`);
            try {
                const resource = await Resource.findByIdAndDelete(_id);
                if (!resource) {
                    console.log(`Resource with ID: ${_id} not found`);
                    throw new Error("Resource not found");
                }
                console.log(`Successfully deleted resource with ID: ${_id}`);
                return resource;
            }
            catch (error) {
                console.error(`Error deleting resource with ID: ${_id}`, error);
                throw new Error("Error deleting resource");
            }
        },
        // updateResource: {},
        // updateUser: {},
    },
};
export default resolvers;
