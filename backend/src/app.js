import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import foodItemRoutes from "./routes/foodItemRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Request Logger (method + path only — never log headers/tokens)
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });
}

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/food-items", foodItemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/categories", categoryRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
