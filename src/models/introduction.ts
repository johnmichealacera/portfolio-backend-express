const { Schema, model } = require("mongoose");

const IntroductionSchema = new Schema({
  title: {
    type: String,
  },
  icon: {
    type: String,
  },
});

module.exports = model("Introduction", IntroductionSchema, "introduction");