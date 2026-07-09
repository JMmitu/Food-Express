import express from "express";
import {
  getDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
} from "../controllers/dealController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getDeals);
router.get("/:id", getDealById);

// Admin Routes
router.post("/", protect, admin, createDeal);
router.put("/:id", protect, admin, updateDeal);
router.delete("/:id", protect, admin, deleteDeal);

export default router;
