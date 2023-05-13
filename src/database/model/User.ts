import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  // Define your data fields here
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true }
});

const UserModel = model('User', userSchema);

export default UserModel;
