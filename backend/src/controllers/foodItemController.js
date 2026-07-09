import FoodItem from "../models/FoodItem.js";

// ===============================
// Get All Foods (Search + Filter + Pagination + Sort)
// ===============================
export async function getFoodItems(req, res, next) {
  try {
    const {
      search,
      category,
      restaurant,
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = req.query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (restaurant) {
      filter.restaurant = restaurant;
    }

    const currentPage = Number(page);
    const perPage = Number(limit);

    const totalFoods = await FoodItem.countDocuments(filter);

    const foodItems = await FoodItem.find(filter)
      .populate("restaurant", "name img rating")
      .sort(sort)
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.json({
      totalFoods,
      currentPage,
      totalPages: Math.ceil(totalFoods / perPage),
      foods: foodItems,
    });
  } catch (err) {
    next(err);
  }
}

// ===============================
// Get Single Food
// ===============================
export async function getFoodItemById(req, res, next) {
  try {
    const foodItem = await FoodItem.findById(req.params.id)
      .populate("restaurant", "name img rating");

    if (!foodItem) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.json(foodItem);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Create Food
// ===============================
export async function createFoodItem(req, res, next) {
  try {
    const foodItem = await FoodItem.create(req.body);

    res.status(201).json(foodItem);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Update Food
// ===============================
export async function updateFoodItem(req, res, next) {
  try {
    const foodItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!foodItem) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.json(foodItem);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Delete Food
// ===============================
export async function deleteFoodItem(req, res, next) {
  try {
    const foodItem = await FoodItem.findByIdAndDelete(req.params.id);

    if (!foodItem) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.json({
      message: "Food item deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}