import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  getOrderByIdAdmin,
  updateOrderStatusAdmin,
  deleteOrder,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// All routes require Admin Login
router.use(protect);
router.use(admin);

// ================= Dashboard =================
router.get("/dashboard", getDashboardStats);

// ================= User Management =================
router.get("/users", getAllUsers);

// ================= Order Management =================

// Get All Orders
router.get("/orders", getAllOrders);

// Get Single Order
router.get("/orders/:id", getOrderByIdAdmin);

// Update Order Status
router.put("/orders/:id/status", updateOrderStatusAdmin);

// Delete Order
router.delete("/orders/:id", deleteOrder);

export default router;