import express from 'express';
import { getProjects, getIntroductions, getSkills, getSocialMedia, getUserInfo, getUserDetails, getSoftSkills, getSkillOverview, getPersonal } from "../controller/portfolio.controller";

const router = express.Router();
router.get('/projects/:userEmail', getProjects);
router.get('/introductions/:userEmail', getIntroductions);
router.get('/skills/:userEmail', getSkills) ;
router.get('/social-media/:userEmail', getSocialMedia);
router.get('/user-info/:userEmail', getUserInfo);
router.get('/user-details/:userEmail', getUserDetails);
router.get('/soft-skills/:userEmail', getSoftSkills);
router.get('/skill-overview/:userEmail', getSkillOverview);
router.get('/personal/:userEmail', getPersonal);

export default router;