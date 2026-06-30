import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    cuisine: { type: String, trim: true },
    img: { type: String },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    deliveryTime: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
