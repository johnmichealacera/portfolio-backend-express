import { NextFunction, Request, Response } from "express";
import Redis from "../cache/cache.redis";
import DbConnection from '../database/db';

export const getRedisClient = async (): Promise<any> => {
  const redis = new Redis();
  return redis.subscribe().then(() => {
    console.log('subscribing to redis');
    return redis.getClient();
  }).catch((error) => {
    console.error('error in subscription getRedisClient');
    return null;
  });
}

export const fetchRedisData = async (key: string) => {
  const redisClient = await getRedisClient();
  console.log('redisClient', redisClient);
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
  console.log('saveRedisData');
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
  const sql = 'SELECT title, description, url, imageLink FROM projects, users where projects.user_id = users.user_id and projects.user_id = ?;';
  await connection.query(sql, sqlParams, function (err: Error, results: any) {
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
  const sqlExpertise = 'SELECT title, icon FROM introductions, users where introductions.user_id = users.user_id and users.user_id=?;';
  const introductionObj = {
    expertise: [],
    fullName: '',
    jobDescription: '',
  };
  await connection.query(sqlExpertise, sqlParams, function (err: Error, results: any) {
    if (err) throw err;
    introductionObj.expertise = results;
  });
  const sqlUserData = 'SELECT user_full_name as fullName, user_info_job_description as jobDescription FROM users, users_info where users_info.user_id=users.user_id and users.user_id=?;';
  await connection.query(sqlUserData, sqlParams, function (err: Error, results: any) {
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
  const sql = 'SELECT type, name, mastery FROM skills, users where skills.user_id = users.user_id and skills.user_id = ?;';
  await connection.query(sql, sqlParams, function (err: Error, results: any) {
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
  const sql = 'SELECT type, url FROM socialmedia, users where socialmedia.user_id = users.user_id and socialmedia.user_id = ?;';
  await connection.query(sql, sqlParams, function (err: Error, results: any) {
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
  const sql = 'SELECT user_info_job_description as jobDescription, user_info_short_life_story as lifeStory, user_info_why_doing_this as userWhy, bgUrl FROM users_info, users where users_info.user_id = users.user_id and users_info.user_id = ?;';
  await connection.query(sql, sqlParams, function (err: Error, results: any) {
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
  const sql = 'SELECT user_full_name as fullName, user_email as email, user_contact_number as contactNumber FROM users where users.user_id = ?;';
  await connection.query(sql, sqlParams, function (err: Error, results: any) {
    if (err) throw err;
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
  const sql = 'SELECT name , shortDescription, icon FROM softSkills, users where softSkills.user_id = users.user_id and softSkills.user_id = ?;';
  await connection.query(sql, sqlParams, function (err: Error, results: any) {
    if (err) throw err;
    saveRedisData(`soft-skills-${userId}`, results);
    return res.status(200).json(results);
  });
  connection.end()
}