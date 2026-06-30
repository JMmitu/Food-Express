import { Cart } from "../models/Cart.js";
import FoodItem from "../models/FoodItem.js";

// GET /api/cart
export async function getCart(req, res) {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.foodItem"
    );

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// POST /api/cart
export async function addToCart(req, res) {
  try {
    const { foodItemId, quantity } = req.body;

    if (!foodItemId) {
      return res.status(400).json({ message: "foodItemId is required" });
    }

    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.foodItem.toString() === foodItemId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        foodItem: foodItemId,
        quantity: quantity || 1,
        price: foodItem.price,
      });
    }

    await cart.save();
    await cart.populate("items.foodItem");

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// PUT /api/cart/:foodItemId
export async function updateCartItem(req, res) {
  try {
    const { foodItemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.foodItem.toString() === foodItemId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.foodItem");

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// DELETE /api/cart/:foodItemId
export async function removeFromCart(req, res) {
  try {
    const { foodItemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.foodItem.toString() !== foodItemId
    );

    await cart.save();
    await cart.populate("items.foodItem");

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// DELETE /api/cart
export async function clearCart(req, res) {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}