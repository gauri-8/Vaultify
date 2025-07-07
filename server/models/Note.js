// models/Note.js
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
