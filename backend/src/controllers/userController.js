import { User } from "../models/User.js";

export const updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { username, bio, profileImage, bgColor, links } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        username,
        bio,
        profileImage,
        links,
        appearance: { bgColor },
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getProfileByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { username, bio, profileImage, links, appearance } = user;
    res.json({ username, bio, profileImage, links, appearance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

