import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  techStack: { type: String },
  link: { type: String },
  category: { type: String, enum: ['Frontend', 'Full Stack', 'Mini'], default: 'Frontend' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;