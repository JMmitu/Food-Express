import express from "express";
import {
<<<<<<< HEAD
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
=======
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/:foodItemId", protect, updateCartItem);
router.delete("/:foodItemId", protect, removeFromCart);
router.delete("/", protect, clearCart);

export default router;
=======
router.use(protect);

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:foodItemId", updateCartItem);
router.delete("/:foodItemId", removeFromCart);
router.delete("/", clearCart);

export default router;
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698
