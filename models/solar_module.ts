import mongoose from "mongoose";

const SolarModuleSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        }
    },
    { timestamps: true },
);

export default mongoose.models.SolarModule || mongoose.model("SolarModule", SolarModuleSchema);