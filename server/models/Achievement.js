import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: function () {
    return this.type !== "milestone";
  },
  },
  type: {
    type: String, // 'certification' | 'hackathon' | 'milestone'
    required: true,
  },
  platform: {
    type: String, // e.g. 'Coursera', 'Hackathon Name'
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  certificateLink: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Achievement', achievementSchema);
