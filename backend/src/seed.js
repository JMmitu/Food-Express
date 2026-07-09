import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "./config/db.js";

import User from "./models/User.js";
import Restaurant from "./models/Restaurant.js";
import FoodItem from "./models/FoodItem.js";
import Deal from "./models/Deal.js";
import Category from "./models/Category.js";
import Cart from "./models/Cart.js";
import Order from "./models/Order.js";

const categories = [
  { name: "Burgers", emoji: "🍔", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&auto=format", order: 1 },
  { name: "Pizza", emoji: "🍕", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop&auto=format", order: 2 },
  { name: "Sushi", emoji: "🍣", img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=200&h=200&fit=crop&auto=format", order: 3 },
  { name: "Salads", emoji: "🥗", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop&auto=format", order: 4 },
  { name: "Noodles", emoji: "🍜", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop&auto=format", order: 5 },
  { name: "Desserts", emoji: "🍰", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&h=200&fit=crop&auto=format", order: 6 },
  { name: "Drinks", emoji: "🥤", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop&auto=format", order: 7 },
  { name: "Chicken", emoji: "🍗", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop&auto=format", order: 8 },
];

const restaurants = [
  { name: "McDonald's", cuisine: "Fast Food", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop&auto=format", rating: 4.3, deliveryTime: "20-30m", address: "Gulshan, Dhaka" },
  { name: "Pizza Hut", cuisine: "Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&auto=format", rating: 4.5, deliveryTime: "25-35m", address: "Banani, Dhaka" },
  { name: "KFC", cuisine: "Fried Chicken", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=400&fit=crop&auto=format", rating: 4.2, deliveryTime: "20-30m", address: "Dhanmondi, Dhaka" },
  { name: "Sushi Bar", cuisine: "Japanese", img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop&auto=format", rating: 4.7, deliveryTime: "30-40m", address: "Baridhara, Dhaka" },
  { name: "Burger King", cuisine: "Fast Food", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop&auto=format", rating: 4.1, deliveryTime: "20-30m", address: "Uttara, Dhaka" },
  { name: "Noodle House", cuisine: "Asian", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&auto=format", rating: 4.4, deliveryTime: "25-35m", address: "Mirpur, Dhaka" },
];

function foodsFor(restaurantMap) {
  return [
    { name: "Classic Cheeseburger", restaurantName: "McDonald's", price: 6.99, category: "Burgers", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format", description: "Juicy beef patty with melted cheese, lettuce and tomato." },
    { name: "Big Mac", restaurantName: "McDonald's", price: 7.49, category: "Burgers", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop&auto=format", description: "Two beef patties, special sauce, lettuce, cheese, pickles, onions." },
    { name: "Crispy Fries", restaurantName: "McDonald's", price: 2.99, category: "Burgers", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&auto=format", description: "Golden, crispy, salted fries." },

    { name: "Pepperoni Pizza", restaurantName: "Pizza Hut", price: 11.99, category: "Pizza", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format", description: "Classic pepperoni with mozzarella on a hand-tossed crust." },
    { name: "Margherita Pizza", restaurantName: "Pizza Hut", price: 10.49, category: "Pizza", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format", description: "Fresh basil, mozzarella and tomato sauce." },
    { name: "BBQ Chicken Pizza", restaurantName: "Pizza Hut", price: 12.99, category: "Pizza", img: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400&h=300&fit=crop&auto=format", description: "Smoky BBQ sauce, grilled chicken and red onions." },

    { name: "Fried Chicken Bucket", restaurantName: "KFC", price: 14.99, category: "Chicken", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop&auto=format", description: "8 pieces of our original recipe fried chicken." },
    { name: "Spicy Chicken Wings", restaurantName: "KFC", price: 8.49, category: "Chicken", img: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop&auto=format", description: "Crispy wings tossed in spicy seasoning." },

    { name: "Salmon Nigiri Set", restaurantName: "Sushi Bar", price: 16.99, category: "Sushi", img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&auto=format", description: "Fresh salmon nigiri, 8 pieces." },
    { name: "California Roll", restaurantName: "Sushi Bar", price: 9.99, category: "Sushi", img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format", description: "Crab, avocado and cucumber roll." },
    { name: "Miso Soup", restaurantName: "Sushi Bar", price: 3.49, category: "Sushi", img: "https://images.unsplash.com/photo-1614777986387-015c2a89b696?w=400&h=300&fit=crop&auto=format", description: "Traditional Japanese soybean soup." },

    { name: "Whopper", restaurantName: "Burger King", price: 7.29, category: "Burgers", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&auto=format", description: "Flame-grilled beef patty with fresh toppings." },
    { name: "Chicken Royale", restaurantName: "Burger King", price: 6.79, category: "Chicken", img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop&auto=format", description: "Crispy chicken fillet burger with mayo." },

    { name: "Pad Thai", restaurantName: "Noodle House", price: 9.49, category: "Noodles", img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop&auto=format", description: "Stir-fried rice noodles with shrimp, egg and peanuts." },
    { name: "Beef Ramen", restaurantName: "Noodle House", price: 10.99, category: "Noodles", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format", description: "Rich broth ramen with slow-braised beef." },
    { name: "Vegetable Spring Rolls", restaurantName: "Noodle House", price: 5.49, category: "Noodles", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&auto=format", description: "Crispy rolls filled with fresh vegetables." },
  ].map((f) => ({
    name: f.name,
    price: f.price,
    category: f.category,
    img: f.img,
    description: f.description,
    restaurant: restaurantMap[f.restaurantName],
  }));
}

function dealsFor(restaurantMap) {
  return [
    { title: "50% OFF First Order", restaurantName: "McDonald's", code: "FIRST50", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop&auto=format", color: "#FF6B35" },
    { title: "Free Delivery Weekend", restaurantName: "Pizza Hut", code: "FREEDEL", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop&auto=format", color: "#2F4858" },
    { title: "Buy 1 Get 1 Free", restaurantName: "KFC", code: "BOGOF23", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=200&fit=crop&auto=format", color: "#22C55E" },
    { title: "30% OFF Sushi Orders", restaurantName: "Sushi Bar", code: "SUSHI30", img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=300&h=200&fit=crop&auto=format", color: "#8B5CF6" },
    { title: "Family Meal Deals", restaurantName: "Burger King", code: "FAMILY", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop&auto=format", color: "#EF4444" },
  ].map((d) => ({
    title: d.title,
    code: d.code,
    img: d.img,
    color: d.color,
    restaurant: restaurantMap[d.restaurantName],
  }));
}

async function seed() {
  await connectDB();

  console.log("Clearing existing data...");
  await Promise.all([
    User.deleteMany({}),
    Restaurant.deleteMany({}),
    FoodItem.deleteMany({}),
    Deal.deleteMany({}),
    Category.deleteMany({}),
    Cart.deleteMany({}),
    Order.deleteMany({}),
  ]);

  console.log("Seeding users...");
  await User.create([
    { name: "Admin User", email: "admin@foodexpress.com", password: "admin123", isAdmin: true },
    { name: "John Doe", email: "john@example.com", password: "password123", isAdmin: false },
    { name: "Jane Smith", email: "jane@example.com", password: "password123", isAdmin: false },
  ]);

  console.log("Seeding categories...");
  await Category.insertMany(categories);

  console.log("Seeding restaurants...");
  const createdRestaurants = await Restaurant.insertMany(restaurants);

  const restaurantMap = {};
  createdRestaurants.forEach((r) => {
    restaurantMap[r.name] = r._id;
  });

  console.log("Seeding food items...");
  await FoodItem.insertMany(foodsFor(restaurantMap));

  console.log("Seeding deals...");
  await Deal.insertMany(dealsFor(restaurantMap));

  console.log("✅ Seed complete!");
  console.log("Admin login -> email: admin@foodexpress.com | password: admin123");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
