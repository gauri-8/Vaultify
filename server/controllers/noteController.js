import Note from '../models/Note.js';

export const addNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = await Note.create({
      title,
      content,
      userId: req.user.id, // from your authMiddleware
    });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

export const getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // only update your own note
      { title, content },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ error: "Note not found" });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};
