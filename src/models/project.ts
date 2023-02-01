const mongooseInstance = require("mongoose");

const ProjectSchema = new mongooseInstance.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  imageLink: {
    type: String,
  },
});

module.exports = mongooseInstance.model("Project", ProjectSchema);