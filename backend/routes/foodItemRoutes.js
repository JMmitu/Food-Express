import express from "express";
import {
    createFoodItem,
    deleteFoodItem,
    getFoodItemById,
    getFoodItems,
    updateFoodItem,
} from "../controllers/foodItemController.js";

const router = express.Router();

router.get("/", getFoodItems);
router.get("/:id", getFoodItemById);
router.post("/", createFoodItem);
router.put("/:id", updateFoodItem);
router.delete("/:id", deleteFoodItem);

export default router;