const Project = require("../../src/models/project.ts");
const Introduction = require("../../src/models/introduction.ts");
const Skill = require("../../src/models/skill.ts");
const SocialMedia = require("../../src/models/social-media.ts");
const User = require("../../src/models/user.ts");
const bcrypt = require('bcrypt');

const getProjects = async (req, res, next) => {
  const allProjects = await Project.find({}, { __v: 0, _id: 0 }).lean();
  return res.status(200).json(allProjects);
}

const getIntroductionData = async (req, res, next) => {
  const allIntroductionData = await Introduction.find({}, { __v: 0, _id: 0 }).lean();
  return res.status(200).json(allIntroductionData);
}

const getSkills = async (req, res, next) => {
  const allSkills = await Skill.find({}, { __v: 0, _id: 0 }).lean();
  return res.status(200).json(allSkills);
}

const getSocialMedia = async (req, res, next) => {
  const allSocialMedia = await SocialMedia.find({}, { __v: 0, _id: 0 }).lean();
  return res.status(200).json(allSocialMedia);
}

const postUser = async (req, res, next) => {
  const user = await User.find({username: req.body.username}, { __v: 0, _id: 0 }).lean();
  if (user?.length > 0) {
    return res.status(500).json('Username already taken');
  }
  const saltRounds = 10;
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  const newUser = await new User({ username: req.body.username, password: hash });
	const createdUser = await newUser.save(function (err, user) {
	  if (err) return console.error(err);
	  return user;
	});
  return res.status(200).json(createdUser);
}

const verifyUser = async (req, res, next) => {
  const user = await User.find({username: req.body.username}, { __v: 0, _id: 0 }).lean();
  const password = req.body.password;
  const isVerified = await bcrypt.compareSync(password, user?.[0]?.password); // true
  return isVerified ? res.status(200).json(true) : res.status(401).json(false);
}

module.exports = { getProjects, getIntroductionData, getSkills, getSocialMedia, postUser, verifyUser };