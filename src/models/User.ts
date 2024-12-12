import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URI as string)
mongoose.Promise = global.Promise

const UserSchema = new Schema(
    {
        _id: { type: String },
        userName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User