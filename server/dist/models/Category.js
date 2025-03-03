import { Schema } from "mongoose";
const categorySchema = new Schema({
    type: {
        type: String,
        // index: true,
        // sparse: true,
        // required: true,
        // unique: true,
    },
    description: {
        type: String,
    },
});
export default categorySchema;
