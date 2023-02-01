const { Schema, model } = require("mongoose");

const SocialMediaSchema = new Schema({
  type: {
    type: String,
  },
  url: {
    type: Number,
  },
});

module.exports = model("SocialMedia", SocialMediaSchema, "socialmedia");