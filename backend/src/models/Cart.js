import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
      required: true,
    },
<<<<<<< HEAD
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
=======
    name: { type: String, required: true },
    restaurant: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String },
    quantity: { type: Number, required: true, min: 1, default: 1 },
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

<<<<<<< HEAD
cartSchema.virtual("totalPrice").get(function () {
  return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

cartSchema.set("toJSON", { virtuals: true });
cartSchema.set("toObject", { virtuals: true });

export const Cart = mongoose.model("Cart", cartSchema);
=======
export default mongoose.model("Cart", cartSchema);
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698
