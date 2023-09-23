import mongoose from "mongoose";

const RegionSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    { timestamps: true },
);

export default mongoose.models.Region || mongoose.model("Region", RegionSchema);