import { User } from "../models/User.js";

export const updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { username, bio, profileImage, bgColor, links } = req.body;
  console.log(bgColor);

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
