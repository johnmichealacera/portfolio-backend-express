import express from 'express';
import { getIntroductions, getProjects, getSkills, getSocialMedia, getSoftSkills, getUserDetails, getUserInfo } from "./controller/portfolio.controller";
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

app.get("/projects/:userId", getProjects);
app.get("/introductions/:userId", getIntroductions);
app.get("/skills/:userId", getSkills);
app.get("/social-media/:userId", getSocialMedia);
app.get("/user-info/:userId", getUserInfo);
app.get("/user-details/:userId", getUserDetails);
app.get("/soft-skills/:userId", getSoftSkills);