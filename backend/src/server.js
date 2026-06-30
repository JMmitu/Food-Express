import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import foodItemRoutes from "./routes/foodItemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always resolve .env relative to this file's location (backend/.env)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("MONGO_URI loaded:", process.env.MONGO_URI ? "Yes" : "No");
console.log("cartRoutes type:", typeof cartRoutes);
console.log("foodItemRoutes type:", typeof foodItemRoutes);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
console.log("Cart route mounted at /api/cart");
app.use("/api/fooditems", foodItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/restaurants", restaurantRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB database successfully connected! 🎉");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Registered routes:");
      app._router.stack.forEach((r) => {
        if (r.route) {
          console.log(r.route.path);
        } else if (r.name === "router") {
          console.log(r.regexp);
        }
      });
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });