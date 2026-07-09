import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import FoodItem from "../models/FoodItem.js";
import Order from "../models/Order.js";

// ===============================
// Dashboard Statistics
// ===============================
export async function getDashboardStats(req, res, next) {
  try {
    const totalUsers = await User.countDocuments();
    const totalRestaurants = await Restaurant.countDocuments();
    const totalFoods = await FoodItem.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $match: {
          status: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.json({
      totalUsers,
      totalRestaurants,
      totalFoods,
      totalOrders,
      totalRevenue,
    });
  } catch (err) {
    next(err);
  }
}

// ===============================
// Get All Users
// ===============================
export async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Get All Orders
// ===============================
export async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Get Single Order
// ===============================
export async function getOrderByIdAdmin(req, res, next) {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Update Order Status
// ===============================
export async function updateOrderStatusAdmin(req, res, next) {
  try {
    const { status } = req.body;

    const validStatus = [
      "pending",
      "confirmed",
      "preparing",
      "out-for-delivery",
      "delivered",
      "cancelled",
    ];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (err) {
    next(err);
  }
}

// ===============================
// Delete Order (Optional)
// ===============================
export async function deleteOrder(req, res, next) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}