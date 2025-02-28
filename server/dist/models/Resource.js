import { Schema } from "mongoose";
import categorySchema from "./Category.js";
const resourceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    category: [categorySchema],
});
export default resourceSchema;
