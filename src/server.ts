const express = require('express');
const mongoose = require("mongoose");
const PortfolioController = require("./controller/portfolio.controller.ts");
const app = express();
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
    app.listen(5000, () => console.log("Server started on port 5000"));
  } catch (error) {
    process.exit(1);
  }
};
app.use(express.json());

start();

app.get("/projects", PortfolioController.getProjects);
app.get("/introduction", PortfolioController.getIntroductionData);
app.get("/skills", PortfolioController.getSkills);
app.get("/social-media", PortfolioController.getSocialMedia);
app.post("/user", PortfolioController.postUser);
app.get("/user", PortfolioController.verifyUser);