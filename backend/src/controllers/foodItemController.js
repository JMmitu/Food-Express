import FoodItem from "../models/FoodItem.js";

export async function getFoodItems(req, res, next) {
  try {
    const filter = {};
    if (req.query.restaurant) filter.restaurant = req.query.restaurant;
    if (req.query.category) filter.category = req.query.category;

    const foodItems = await FoodItem.find(filter)
      .populate("restaurant", "name img rating")
      .sort({ createdAt: -1 });

    res.json(foodItems);
  } catch (err) {
    next(err);
  }
}

export async function getFoodItemById(req, res, next) {
  try {
    const foodItem = await FoodItem.findById(req.params.id).populate(
      "restaurant",
      "name img rating"
    );
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json(foodItem);
  } catch (err) {
    next(err);
  }
}

export async function createFoodItem(req, res, next) {
  try {
    const foodItem = await FoodItem.create(req.body);
    res.status(201).json(foodItem);
  } catch (err) {
    next(err);
  }
}

export async function updateFoodItem(req, res, next) {
  try {
    const foodItem = await FoodItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json(foodItem);
  } catch (err) {
    next(err);
  }
}

export async function deleteFoodItem(req, res, next) {
  try {
    const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json({ message: "Food item deleted" });
  } catch (err) {
    next(err);
  }
}
