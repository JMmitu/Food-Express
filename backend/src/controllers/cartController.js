<<<<<<< HEAD
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
=======
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
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698

    if (!foodItemId) {
      return res.status(400).json({ message: "foodItemId is required" });
    }

<<<<<<< HEAD
    const foodItem = await FoodItem.findById(foodItemId);
=======
    const foodItem = await FoodItem.findById(foodItemId).populate("restaurant", "name");
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

<<<<<<< HEAD
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
=======
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
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698
      });
    }

    await cart.save();
<<<<<<< HEAD
    await cart.populate("items.foodItem");

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// PUT /api/cart/:foodItemId
export async function updateCartItem(req, res) {
=======
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
}

export async function updateCartItem(req, res, next) {
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698
  try {
    const { foodItemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
<<<<<<< HEAD
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.foodItem.toString() === foodItemId
    );
=======
      return res.status(400).json({ message: "quantity must be at least 1" });
    }

    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find((i) => i.foodItem.toString() === foodItemId);
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();
<<<<<<< HEAD
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
=======
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
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698
