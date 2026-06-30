<<<<<<< HEAD
import { Cart } from "../models/Cart.js";
import Order from "../models/Order.js";
=======
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698

export async function createOrder(req, res, next) {
  try {
    const { deliveryAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalPrice,
      deliveryAddress,
      paymentMethod,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

export async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function getOrderById(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
}
