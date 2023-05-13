import { Schema, model } from 'mongoose';

const softSkillSchema = new Schema({
  // Define your data fields here
  email: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }
});

const SoftSkillModel = model('SoftSkill', softSkillSchema);

export default SoftSkillModel;
