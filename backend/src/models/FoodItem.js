import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    img: { type: String },
    category: { type: String, trim: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("FoodItem", foodItemSchema);
