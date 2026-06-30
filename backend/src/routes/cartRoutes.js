import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/:foodItemId", protect, updateCartItem);
router.delete("/:foodItemId", protect, removeFromCart);
router.delete("/", protect, clearCart);

export default router;