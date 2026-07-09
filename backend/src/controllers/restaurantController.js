import Restaurant from "../models/Restaurant.js";

export async function getRestaurants(req, res, next) {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
}

export async function getRestaurantById(req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    next(err);
  }
}

export async function createRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (err) {
    next(err);
  }
}

export async function updateRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    next(err);
  }
}

export async function deleteRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json({ message: "Restaurant deleted" });
  } catch (err) {
    next(err);
  }
}
