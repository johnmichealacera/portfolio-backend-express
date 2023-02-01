const introductionMongooseInstance = require("mongoose");

const IntroductionSchema = new introductionMongooseInstance.Schema({
  title: {
    type: String,
  },
  icon: {
    type: String,
  },
});

module.exports = introductionMongooseInstance.model("Introduction", IntroductionSchema);