import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
    },
    savedResources: [
        {
            type: Schema.Types.ObjectId,
            ref: "Resource",
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
const User = model("User", userSchema);
export default User;
