const Project = require("../../src/models/project.ts");
const Introduction = require("../../src/models/introduction.ts");
const Skill = require("../../src/models/skill.ts");
const SocialMedia = require("../../src/models/social-media.ts");
const User = require("../../src/models/user.ts");
const bcrypt = require('bcrypt');
const { Redis } = require("../../src/cache/cache.redis.ts");
const db = require('../database/db.ts');

const fetchRedisData = async (key) => {
  const redis = new Redis();
  const client = await redis.getClient();
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  const value = await client.get(key);
  await client.disconnect();

  if (value) {
    return JSON.parse(value);
  } else {
    return false;
  }

}

const saveRedisData = async (key, data) => {
  const redis = new Redis();
  const client = await redis.getClient();
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  await client.set(key, JSON.stringify(data), {
    EX: 86400,
});
  await client.disconnect();
}

const getProjects = async (req, res, next) => {
  let redisProjects = await fetchRedisData('projects');
  if (!redisProjects) {
    // Query for mongodb
    // redisProjects = await Project.find({}, { __v: 0, _id: 0 }).lean();
    // Query for mysql
    await db.query('SELECT projects.title, projects.description, projects.url, projects.imagelink FROM projects, users where projects.user_id = users.user_id and projects.user_id = 2;', function (error, results, fields) {
      if (error) throw error;
      redisProjects = results;
    });
    await saveRedisData('projects', redisProjects);
  }
  return res.status(200).json(redisProjects);
}

const getIntroductionData = async (req, res, next) => {
  let redisItroductions = await fetchRedisData('introductions');
  if (!redisItroductions) {
    // Query for mongodb
    // redisItroductions = await Introduction.find({}, { __v: 0, _id: 0 }).lean();
    // Query for mysql
    await db.query('SELECT introductions.title, introductions.icon FROM introductions, users where introductions.user_id = users.user_id and users.user_id=2;', function (error, results, fields) {
      if (error) throw error;
      redisItroductions = results;
    });
    await saveRedisData('introductions', redisItroductions);
  }
  return res.status(200).json(redisItroductions);
}

const getSkills = async (req, res, next) => {
  let redisSkills = await fetchRedisData('skills');
  if (!redisSkills) {
    // Query for mongodb
    // redisSkills = await Skill.find({}, { __v: 0, _id: 0 }).lean();
    // Query for mysql
    await db.query('SELECT skills.type, skills.name, mastery FROM skills, users where skills.user_id = users.user_id and skills.user_id = 2;', function (error, results, fields) {
      if (error) throw error;
      redisSkills = results;
    });
    await saveRedisData('skills', redisSkills);
  }
  return res.status(200).json(redisSkills);
}

const getSocialMedia = async (req, res, next) => {
  let redisSocialMeda = await fetchRedisData('social-media');
  if (!redisSocialMeda) {
    // Query for mongodb
    // redisSocialMeda = await SocialMedia.find({}, { __v: 0, _id: 0 }).lean();
    // Query for mysql
    await db.query('SELECT socialmedia.type, socialmedia.url FROM sql12595958.socialmedia, sql12595958.users where socialmedia.user_id = users.user_id and socialmedia.user_id = 2;', function (error, results, fields) {
      if (error) throw error;
      redisSocialMeda = results;
    });
    await saveRedisData('social-media', redisSocialMeda);
  }
  return res.status(200).json(redisSocialMeda);
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
  const user = await User.find({username: req.query.username}, { __v: 0, _id: 0 }).lean();
  if (user.length < 1) {
    return res.status(401).json(false);
  }
  const password = req.query.password;
  const isVerified = await bcrypt.compareSync(password, user?.[0]?.password); // true
  return res.status(200).json(true);
}

module.exports = { getProjects, getIntroductionData, getSkills, getSocialMedia, postUser, verifyUser };