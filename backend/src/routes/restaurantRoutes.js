import express from "express";
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

// Admin Routes
router.post("/", protect, admin, createRestaurant);
router.put("/:id", protect, admin, updateRestaurant);
router.delete("/:id", protect, admin, deleteRestaurant);

export default router;