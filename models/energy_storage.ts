import mongoose from "mongoose";

const EnergyStorageSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        }
    },
    { timestamps: true },
);

export default mongoose.models.EnergyStorage || mongoose.model("EnergyStorage", EnergyStorageSchema);