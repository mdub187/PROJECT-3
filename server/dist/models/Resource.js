import { Schema, model } from "mongoose";
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
    category: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
resourceSchema.virtual("resourceId").get(function () {
    return this._id;
});
const Resource = model("Resource", resourceSchema);
export default Resource;
