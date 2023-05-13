import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  // Define your data fields here
  email: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  backgroundImage: { type: String, required: true }
});

const ProjectModel = model('Project', projectSchema);

export default ProjectModel;
