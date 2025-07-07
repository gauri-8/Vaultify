import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  githubUsername: {type: String, default: "",},
  leetcodeUsername: {type: String, default: "",},
  codeforcesUsername: {type: String, default: "",},
  codechefUsername: {type: String, default: "",},
  gfgUsername: {type: String, default: "",}
});

export default mongoose.model('User', userSchema);
