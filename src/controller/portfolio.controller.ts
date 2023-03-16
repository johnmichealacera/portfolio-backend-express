import { NextFunction, Request, Response } from "express";
import Redis from "../cache/cache.redis";
import DbConnection from '../database/db';

export const getRedisClient = async (): Promise<any> => {
  const redis = new Redis();
  return redis.subscribe().then(() => {
    return redis.getClient();
  }).catch((error) => {
    console.error('error in subscription getRedisClient');
    return null;
  });
}

export const fetchRedisData = async (key: string) => {
  const redisClient = await getRedisClient();
  if (!redisClient) {
    return null;
  } 
  const value = await redisClient.get(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return false;
  }
}

export const saveRedisData = async (key: string, data: Record<string, any>) => {
  const redisClient = await getRedisClient();
  if (!redisClient) {
    return null;
  } 
  await redisClient.set(key, JSON.stringify(data), {
    EX: 86400,
  });
}

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req?.params;
  let redisProjects = await fetchRedisData(`projects-${userId}`);
  if (redisProjects) {
    return res.status(200).json(redisProjects);
  }
  const database = new DbConnection();
  const connection = database.connection;
  connection.connect(function(err: Error) {
    if (err) throw err;
  });
  const sqlParams = [userId];
  const sql = 'SELECT title, description, url, background_image as imageLink FROM project_info, users_info where project_info.user_id = users_info.user_id and project_info.user_id = ?;';
  await connection.query(sql, sqlParams, function (err: any, results: any) {
    if (err) throw err;
    saveRedisData(`projects-${userId}`, results);
    return res.status(200).json(results);
  });
  connection.end()
}

export const getIntroductions = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req?.params;
  let redisData = await fetchRedisData(`introductions-${userId}`);
  if (redisData) {
    return res.status(200).json(redisData);
  }
  const database = new DbConnection();
  const connection = database.connection;
  connection.connect(function(err: Error) {
    if (err) throw err;
  });
  const sqlParams = [userId];
  const sqlExpertise = 'SELECT title, icon FROM skill_overview_info, users_info where skill_overview_info.user_id = users_info.user_id and users_info.user_id=?;';
  const introductionObj = {
    expertise: [],
    fullName: '',
    jobDescription: '',
  };
  await connection.query(sqlExpertise, sqlParams, function (err: any, results: any) {
    if (err) throw err;
    introductionObj.expertise = results;
  });
  const sqlUserData = 'SELECT users_info.full_name as fullName, personal_info.job_description as jobDescription FROM personal_info, users_info where personal_info.user_id=users_info.user_id and personal_info.user_id=?;';
  await connection.query(sqlUserData, sqlParams, function (err: any, results: any) {
    if (err) throw err;
    introductionObj.fullName = results[0]?.fullName;
    introductionObj.jobDescription = results[0]?.jobDescription;
    saveRedisData(`introductions-${userId}`, introductionObj);
    return res.status(200).json(introductionObj);
  });
  connection.end()
}

export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req?.params;
  let redisData = await fetchRedisData(`skills-${userId}`);
  if (redisData) {
    return res.status(200).json(redisData);
  }
  const database = new DbConnection();
  const connection = database.connection;
  connection.connect(function(err: Error) {
    if (err) throw err;
  });
  const sqlParams = [userId];
  const sql = 'SELECT skill_type as type, name, mastery FROM hard_skills_info, users_info where hard_skills_info.user_id = users_info.user_id and hard_skills_info.user_id = ?;';
  await connection.query(sql, sqlParams, function (err: any, results: any) {
    if (err) throw err;
    saveRedisData(`skills-${userId}`, results);
    return res.status(200).json(results);
  });
  connection.end()
}

export const getSocialMedia = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req?.params;
  let redisData = await fetchRedisData(`social-media-${userId}`);
  if (redisData) {
    return res.status(200).json(redisData);
  }
  const database = new DbConnection();
  const connection = database.connection;
  connection.connect(function(err: Error) {
    if (err) throw err;
  });
  const sqlParams = [userId];
  const sql = 'SELECT type, url FROM social_media_info, users_info where social_media_info.user_id = users_info.user_id and social_media_info.user_id = ?;';
  await connection.query(sql, sqlParams, function (err: any, results: any) {
    if (err) throw err;
    saveRedisData(`social-media-${userId}`, results);
    return res.status(200).json(results);
  });
  connection.end()
}

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req?.params;
  let redisData = await fetchRedisData(`user-info-${userId}`);
  if (redisData) {
    return res.status(200).json(redisData);
  }
  const database = new DbConnection();
  const connection = database.connection;
  connection.connect(function(err: Error) {
    if (err) throw err;
  });
  const sqlParams = [userId];
  const sql = 'Select job_description as jobDescription, life_story as lifeStory, why_do_this as userWhy, background_url as bgUrl FROM personal_info, users_info where personal_info.user_id = users_info.user_id and users_info.user_id = ?;';
  await connection.query(sql, sqlParams, function (err: any, results: any) {
    if (err) throw err;
    saveRedisData(`user-info-${userId}`, results?.[0]);
    return res.status(200).json(results?.[0]);
  });
  connection.end()
}

export const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req?.params;
  let redisData = await fetchRedisData(`user-details-${userId}`);
  if (redisData) {
    return res.status(200).json(redisData);
  }
  const database = new DbConnection();
  const connection = database.connection;
  connection.connect(function(err: Error) {
    if (err) throw err;
  });
  const sqlParams = [userId];
  const sql = 'SELECT full_name as fullName, email, contact_number as contactNumber FROM users_info where user_id = ?;';
  connection.query(sql, sqlParams, function (err: any, results: any) {
    if (err)
      throw err;
    saveRedisData(`user-details-${userId}`, results?.[0]);
    return res.status(200).json(results?.[0]);
  });
  connection.end()
}

export const getSoftSkills = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req?.params;
  let redisData = await fetchRedisData(`soft-skills-${userId}`);
  if (redisData) {
    return res.status(200).json(redisData);
  }
  const database = new DbConnection();
  const connection = database.connection;
  connection.connect(function(err: Error) {
    if (err) throw err;
  });
  const sqlParams = [userId];
  const sql = 'SELECT name , description as shortDescription, icon FROM soft_skill, users_info where soft_skill.user_id = users_info.user_id and soft_skill.user_id = ?;';
  await connection.query(sql, sqlParams, function (err: any, results: any) {
    if (err) throw err;
    saveRedisData(`soft-skills-${userId}`, results);
    return res.status(200).json(results);
  });
  connection.end()
}