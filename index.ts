var express = require('express');
const mongoose = require("mongoose");
const Project = require("./src/models/project.ts");
const Introduction = require("./src/models/introduction.ts");
const Skill = require("./src/models/skill.ts");
const SocialMedia = require("./src/models/social-media.ts");
var app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors({
    origin: process.env.PORTFOLIO_FRONTEND_URL,
}));
const start = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB_STRING_CONNECTION
    );
    app.listen(5000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
app.use(express.json());

start();

app.get("/projects", async (req, res) => {
  const allProjects = await Project.find({}, { __v: 0, _id: 0 }).lean();
  return res.status(200).json(allProjects);
});

app.get("/introduction", async (req, res) => {
  const allIntroductionData = await Introduction.find({}, { __v: 0, _id: 0 }).lean();
  return res.status(200).json(allIntroductionData);
});

app.get("/skills", async (req, res) => {
  const allSkills = await Skill.find({}, { __v: 0, _id: 0 }).lean();
  return res.status(200).json(allSkills);
});

app.get("/social-media", async (req, res) => {
  const allSocialMedia = await SocialMedia.find({}, { __v: 0, _id: 0 }).lean();
  return res.status(200).json(allSocialMedia);
});