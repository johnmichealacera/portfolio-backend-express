import { Schema, model } from 'mongoose';

const hardSkillSchema = new Schema({
  // Define your data fields here
  email: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  mastery: { type: Number, required: true }
});

const HardSkillModel = model('Skill', hardSkillSchema);

export default HardSkillModel;
