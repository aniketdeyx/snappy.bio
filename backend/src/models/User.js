import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  label: String,
  url: String,
  icon: String
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  username: String,
  bio: String,
  profileImage: String,
  links: [linkSchema],
  appearance: {
    bgColor: String,
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
