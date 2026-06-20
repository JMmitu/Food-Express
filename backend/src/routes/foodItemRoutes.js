import express from "express";
import {
  getFoodItems,
  getFoodItemById,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
} from "../controllers/foodItemController.js";

const router = express.Router();

router.get("/", getFoodItems);
router.get("/:id", getFoodItemById);
router.post("/", createFoodItem);
router.put("/:id", updateFoodItem);
router.delete("/:id", deleteFoodItem);

export default router;
