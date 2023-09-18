import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        password_last_changed: {
            type: Date,
        },
        role: {
            type: String,
            required: true,
            defualt: 'admin',
        }
    },
    { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);