<<<<<<< HEAD
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
=======
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6, select: false },
<<<<<<< HEAD
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
=======
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

<<<<<<< HEAD
export default mongoose.model("User", userSchema);
=======
export default mongoose.model("User", userSchema);
>>>>>>> 2353d74ebe6266f313eb60bb016f156df41b2698
