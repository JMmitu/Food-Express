import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    code: { type: String, required: true, trim: true, uppercase: true },
    img: { type: String },
    color: { type: String, default: "#FF6B35" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Deal", dealSchema);
