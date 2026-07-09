import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    emoji: { type: String, default: "🍽️" },
    img: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
