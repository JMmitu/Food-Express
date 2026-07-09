import express from "express";
import {
  getFoodItems,
  getFoodItemById,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
} from "../controllers/foodItemController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getFoodItems);
router.get("/:id", getFoodItemById);

// Admin Routes
router.post("/", protect, admin, createFoodItem);
router.put("/:id", protect, admin, updateFoodItem);
router.delete("/:id", protect, admin, deleteFoodItem);

export default router;