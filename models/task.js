import mongoose from 'mongoose';

const Task = new mongoose.Schema({
  number: { type: Number },
  title: { type: String, require: true },
  description: { type: String },
  priority: { type: String, require: true },
  start: { type: String, require: true },
  progress: { type: String, require: true },
  project: { type: String, require: true },
  color: { type: String, require: true },
});

export default mongoose.model('Task', Task);
