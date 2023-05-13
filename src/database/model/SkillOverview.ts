import { Schema, model } from 'mongoose';

const skillOverviewSchema = new Schema({
  // Define your data fields here
  email: { type: String, required: true },
  title: { type: String, required: true },
  icon: { type: String, required: true }
});

const SkillOverviewModel = model('SkillOverview', skillOverviewSchema);

export default SkillOverviewModel;
