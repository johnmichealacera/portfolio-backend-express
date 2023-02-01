const { Schema, model } = require("mongoose");

const SkillSchema = new Schema({
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  mastery: {
    type: Number,
  },
});

module.exports = model("Skill", SkillSchema, "skills");