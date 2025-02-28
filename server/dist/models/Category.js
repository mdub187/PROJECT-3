import { Schema } from "mongoose";
const categorySchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
});
export default categorySchema;
