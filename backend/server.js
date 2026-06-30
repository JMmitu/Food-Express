import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { Cart } from './models/Cart.js'; // কার্ট মডেল ইম্পোর্ট

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB database successfully connected! 🎉'))
  .catch((err) => console.error('Database connection error: ', err));


// ==================== ১. ইউজার মডিউল (আগের টেস্ট কোড) ====================
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User successfully saved to MongoDB! 🚀" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ==================== ২. কার্ট মডিউল (নতুন কোড) ====================

// ক. কার্টে খাবার যোগ করা (Add to Cart)
app.post('/api/cart/add', async (req, res) => {
  const { userId, item } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [item] });
    } else {
      const itemIndex = cart.items.findIndex(p => p.foodId === item.foodId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += item.quantity;
      } else {
        cart.items.push(item);
      }
    }
    await cart.save();
    res.status(200).json({ message: "Item added to cart successfully!", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// খ. খাবারের পরিমাণ পরিবর্তন করা (Update Quantity)
app.post('/api/cart/update', async (req, res) => {
  const { userId, foodId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(p => p.foodId === foodId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json({ message: "Quantity updated successfully!", cart });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// গ. কার্ট থেকে খাবার মুছে ফেলা (Remove Item)
app.post('/api/cart/remove', async (req, res) => {
  const { userId, foodId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(p => p.foodId !== foodId);
    await cart.save();
    res.status(200).json({ message: "Item removed from cart successfully!", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ===================================================================

// Test Route
app.get('/', (req, res) => {
  res.send('FoodExpress Backend Server is running successfully!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});