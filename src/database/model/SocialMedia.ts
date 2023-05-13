import { Schema, model } from 'mongoose';

const socialMediaSchema = new Schema({
  // Define your data fields here
  email: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true }
});

const SocialMediaModel = model('SocialMedia', socialMediaSchema);

export default SocialMediaModel;
