import Category from "../models/Category.js";

// ===============================
// Get All Categories (Public)
// ===============================
export async function getCategories(req, res, next) {
  try {
    const categories = await Category.find().sort({ order: 1, createdAt: 1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Get Single Category
// ===============================
export async function getCategoryById(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Create Category (Admin)
// ===============================
export async function createCategory(req, res, next) {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Update Category (Admin)
// ===============================
export async function updateCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Delete Category (Admin)
// ===============================
export async function deleteCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
}
