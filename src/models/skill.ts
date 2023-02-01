const skillMongooseInstance = require("mongoose");

const SkillSchema = new skillMongooseInstance.Schema({
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

module.exports = skillMongooseInstance.model("Skill", SkillSchema);