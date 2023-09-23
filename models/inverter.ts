import mongoose from "mongoose";

const InverterSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        }
    },
    { timestamps: true },
);

export default mongoose.models.Inverter || mongoose.model("Inverter", InverterSchema);