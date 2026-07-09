import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// User Routes
router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// Admin Route
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;