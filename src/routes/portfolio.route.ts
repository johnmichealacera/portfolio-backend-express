import express from 'express';
import { getProjects, getIntroductions, getSkills, getSocialMedia, getUserInfo, getUserDetails, getSoftSkills } from "../controller/portfolio.controller";

const router = express.Router();
router.get('/projects/:userEmail', getProjects);
router.get('/introductions/:userEmail', getIntroductions);
router.get('/skills/:userEmail', getSkills) ;
router.get('/social-media/:userEmail', getSocialMedia);
router.get('/user-info/:userEmail', getUserInfo);
router.get('/user-details/:userEmail', getUserDetails);
router.get('/soft-skills/:userEmail', getSoftSkills);

export default router;