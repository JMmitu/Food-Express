import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createOrder);
router.get("/", getMyOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

export default router;
