import jwt from "jsonwebtoken";
import User from "../models/User.js";

function generateToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
}

export async function registerUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      user: sanitizeUser(user),
      token,
    });
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    res.json({
      user: sanitizeUser(user),
      token,
    });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    res.json({
      user: sanitizeUser(req.user),
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    if (email !== req.user.email) {
      const existing = await User.findOne({ email });

      if (existing) {
        return res.status(409).json({
          message: "An account with this email already exists",
        });
      }
    }

    req.user.name = name;
    req.user.email = email;

    await req.user.save();

    res.json({
      user: sanitizeUser(req.user),
    });
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;

    await user.save();

    res.json({
      message: "Password updated successfully",
    });
  } catch (err) {
    next(err);
  }
}
