import { Schema, model } from 'mongoose';

const personalSchema = new Schema({
  // Define your data fields here
  email: { type: String, required: true },
  jobDescription: { type: String, required: true },
  lifeStory: { type: String, required: true },
  whyDoThis: { type: String, required: true },
  backgroundUrl: { type: String, required: true }
});

const PersonalModel = model('Personal', personalSchema);

export default PersonalModel;
