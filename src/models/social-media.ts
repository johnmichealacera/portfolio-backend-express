const socialMediaMongooseInstance = require("mongoose");

const SocialMediaSchema = new socialMediaMongooseInstance.Schema({
  type: {
    type: String,
  },
  url: {
    type: Number,
  },
});

module.exports = socialMediaMongooseInstance.model("SocialMedia", SocialMediaSchema, "socialmedia");