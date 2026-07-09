import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);
router.put("/me/password", protect, changePassword);

export default router;
