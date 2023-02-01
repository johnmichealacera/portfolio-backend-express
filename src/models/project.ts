const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
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

module.exports = model("Project", ProjectSchema, "project");