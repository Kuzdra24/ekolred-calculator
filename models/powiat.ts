import mongoose from "mongoose";

const PowiatSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        nazwa: {
            type: String,
            required: true,
        },
        stawka: {
            type: Number,
            required: true,
        },
        aktywny: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    { timestamps: true },
);

export default mongoose.models.Powiat || mongoose.model("Powiat", PowiatSchema);