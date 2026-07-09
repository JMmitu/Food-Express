import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin Routes
router.post("/", protect, admin, createCategory);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;
