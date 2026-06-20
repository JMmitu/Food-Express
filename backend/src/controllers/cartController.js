import Cart from "../models/Cart.js";
import FoodItem from "../models/FoodItem.js";

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
}

export async function getCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

export async function addToCart(req, res, next) {
  try {
    const { foodItemId, quantity = 1 } = req.body;

    if (!foodItemId) {
      return res.status(400).json({ message: "foodItemId is required" });
    }

    const foodItem = await FoodItem.findById(foodItemId).populate("restaurant", "name");
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const cart = await getOrCreateCart(req.user._id);
    const existing = cart.items.find((i) => i.foodItem.toString() === foodItemId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        foodItem: foodItem._id,
        name: foodItem.name,
        restaurant: foodItem.restaurant?.name || "Unknown",
        price: foodItem.price,
        img: foodItem.img,
        quantity,
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
}

export async function updateCartItem(req, res, next) {
  try {
    const { foodItemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "quantity must be at least 1" });
    }

    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find((i) => i.foodItem.toString() === foodItemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

export async function removeFromCart(req, res, next) {
  try {
    const { foodItemId } = req.params;
    const cart = await getOrCreateCart(req.user._id);

    cart.items = cart.items.filter((i) => i.foodItem.toString() !== foodItemId);

    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

export async function clearCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
}
