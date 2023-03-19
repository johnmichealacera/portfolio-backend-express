import express from 'express';
import { getProjects, getIntroductions, getSkills, getSocialMedia, getUserInfo, getUserDetails, getSoftSkills } from "../controller/portfolio.controller";

const router = express.Router();
router.get('/projects/:userId', getProjects);
router.get('/introductions/:userId', getIntroductions);
router.get('/skills/:userId', getSkills) ;
router.get('/social-media/:userId', getSocialMedia);
router.get('/user-info/:userId', getUserInfo);
router.get('/user-details/:userId', getUserDetails);
router.get('/soft-skills/:userId', getSoftSkills);

export default router;