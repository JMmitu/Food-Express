import Deal from "../models/Deal.js";

// ===============================
// Get All Active Deals (Public)
// ===============================
export async function getDeals(req, res, next) {
  try {
    const deals = await Deal.find({ isActive: true })
      .populate("restaurant", "name img rating")
      .sort({ createdAt: -1 });

    res.json(deals);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Get Single Deal
// ===============================
export async function getDealById(req, res, next) {
  try {
    const deal = await Deal.findById(req.params.id).populate(
      "restaurant",
      "name img rating"
    );

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.json(deal);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Create Deal (Admin)
// ===============================
export async function createDeal(req, res, next) {
  try {
    const deal = await Deal.create(req.body);
    res.status(201).json(deal);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Update Deal (Admin)
// ===============================
export async function updateDeal(req, res, next) {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.json(deal);
  } catch (err) {
    next(err);
  }
}

// ===============================
// Delete Deal (Admin)
// ===============================
export async function deleteDeal(req, res, next) {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.json({ message: "Deal deleted successfully" });
  } catch (err) {
    next(err);
  }
}
