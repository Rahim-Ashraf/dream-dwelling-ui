import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));
mongoose.Promise = global.Promise

const UserSchema = new Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        photoURL: { type: String },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User