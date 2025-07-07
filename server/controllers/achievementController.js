import Achievement from '../models/Achievement.js';

export const createAchievement = async (req, res) => {
  try {
    const newAch = new Achievement({ ...req.body, userId: req.user.id });
    await newAch.save();
    res.status(201).json(newAch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ userId: req.user.id });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const updated = await Achievement.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    const deleted = await Achievement.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Achievement deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
