import { signToken } from "../services/auth.js";
import { AuthenticationError } from "../services/auth.js";
import { User, Resource } from "../models/index.js";
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
        getResource: async (_parent, { _id }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            try {
                const resource = await Resource.findById(_id);
                if (!resource) {
                    throw new Error("Resource not found");
                }
                return resource;
            }
            catch (error) {
                throw new Error("Error fetching resource");
            }
        },
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
        updateUser: async (_parent, args, context) => {
            //if the user wants to update the password, then the encryption needs to be called to encrypt the password before it is stored in the database
            //   console.log(context.user);
            if (context.user) {
                // return User.findByIdAndUpdate(
                //     {
                //       _id: context.user._id,
                //     },
                //     args,
                //     {
                //       new: true,
                //     }
                //   );
                const updatedUser = await User.findByIdAndUpdate(context.user._id, {
                    $set: {
                        //   ...args,
                        username: args.username || context.user.username,
                        email: args.email || context.user.email,
                        password: args.password || context.user.password,
                    },
                }, {
                    new: true,
                    runValidators: true,
                });
                // const updatedUser = await User.findOneAndUpdate(
                //     { _id: context.user._id },
                //     { $set: { ...args } },
                //     { returnDocument: "after", runValidators: true }
                //   );
                console.log(updatedUser);
                return updatedUser;
            }
            throw new AuthenticationError("Authentication Error");
        },
        deleteUser: async (_parent, _args, context) => {
            console.log(context.user);
            if (context.user) {
                const user = await User.findByIdAndDelete(context.user._id);
                console.log(user);
                return;
            }
            throw new AuthenticationError("Must be logged in to delete account");
        },
        login: async (_parent, args, _context) => {
            const user = await User.findOne({
                $or: [{ username: args.username }, { email: args.email }],
            });
            if (!user) {
                throw new AuthenticationError("Authentication Error");
            }
            const correctPw = await user.isCorrectPassword(args.password);
            if (!correctPw) {
                throw new AuthenticationError("Authentication Error");
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
                return savedResource;
            }
            catch (error) {
                throw new Error("Error adding resource");
            }
        },
        deleteResource: async (_parent, { _id }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            try {
                const resource = await Resource.findByIdAndDelete(_id);
                if (!resource) {
                    throw new Error("Resource not found");
                }
                console.log(`Successfully deleted resource with ID: ${_id}`);
                return resource;
            }
            catch (error) {
                throw new Error("Error deleting resource");
            }
        },
        // updateResource: {},
    },
};
export default resolvers;
