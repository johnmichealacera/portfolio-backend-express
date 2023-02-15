import express from 'express';
import { getIntroductionData, getProjects, getSkills, getSocialMedia } from "./controller/portfolio.controller";
import * as dotenv from "dotenv";

const app = express();
const cors = require('cors');
dotenv.config();
app.use(cors({
    origin: process.env.PORTFOLIO_FRONTEND_URL,
}));
const start = async () => {
  try {
    app.listen(5000, () => console.log("Server started on port 5000"));
  } catch (error) {
    process.exit(1);
  }
};
app.use(express.json());

start();

app.get("/projects", getProjects);
app.get("/introduction", getIntroductionData);
app.get("/skills", getSkills);
app.get("/social-media", getSocialMedia);