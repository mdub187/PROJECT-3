// import mongoose from "mongoose";
// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/codingresources"
//     );
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// };
// export default connectDB;
import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/codingresources");
const db = mongoose.connect;
export default db;
