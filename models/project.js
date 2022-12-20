import mongoose from 'mongoose';

const Project = new mongoose.Schema({
  title: { type: String, require: true },
  color: { type: String, require: true },
  tasks: { type: Array, ref: 'Task' },
});

export default mongoose.model('Project', Project);
