import { NextFunction, Request, Response } from "express";
import { Redis } from "../cache/cache.redis";
import { dbConnection } from '../database/db';

export const fetchRedisData = async (key: string) => {
  const redis = new Redis();
  const client = await redis.getClient();
  client.on('error', (err: Error) => console.log('Redis Client Error', err));
  await client.connect();
  const value = await client.get(key);
  await client.disconnect();

  if (value) {
    return JSON.parse(value);
  } else {
    return false;
  }

}

export const saveRedisData = async (key: string, data: Record<string, any>) => {
  const redis = new Redis();
  const client = await redis.getClient();
  client.on('error', (err: Error) => console.log('Redis Client Error', err));
  await client.connect();
  await client.set(key, JSON.stringify(data), {
    EX: 86400,
});
  await client.disconnect();
}

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  let redisProjects = await fetchRedisData('projects');
  if (redisProjects) {
    return res.status(200).json(redisProjects);
  }
  const connection = await dbConnection(process.env.MYSQL_HOST ?? '', process.env.MYSQL_USERNAME ?? '', process.env.MYSQL_PASSWORD ?? '', process.env.MYSQL_DATABASE ?? '');
  connection.connect(function(err: Error) {
    if (err) throw err;
  });
  await connection.query('SELECT projects.title, projects.description, projects.url, projects.imageLink FROM projects, users where projects.user_id = users.user_id and projects.user_id = 2;', async function (error: Error, results: any) {
    if (error) throw error;
    saveRedisData('projects', results);
    return res.status(200).json(results);
  });
}

export const getIntroductionData = async (req: Request, res: Response, next: NextFunction) => {
  let redisItroductions = await fetchRedisData('introductions');
  if (redisItroductions) {
    return res.status(200).json(redisItroductions);
  }
  const connection = await dbConnection(process.env.MYSQL_HOST ?? '', process.env.MYSQL_USERNAME ?? '', process.env.MYSQL_PASSWORD ?? '', process.env.MYSQL_DATABASE ?? '');
  connection.connect(function(err: Error) {
    if (err) throw err;
  });
  await connection.query('SELECT introductions.title, introductions.icon FROM introductions, users where introductions.user_id = users.user_id and users.user_id=2;', async function (error: Error, results: any) {
    if (error) throw error;
    saveRedisData('introductions', results);
    return res.status(200).json(results);
  });
}

export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  let redisSkills = await fetchRedisData('skills');
  if (redisSkills) {
    return res.status(200).json(redisSkills);
  }
  const connection = await dbConnection(process.env.MYSQL_HOST ?? '', process.env.MYSQL_USERNAME ?? '', process.env.MYSQL_PASSWORD ?? '', process.env.MYSQL_DATABASE ?? '');
  connection.connect(function(err: Error) {
    if (err) throw err;
  });
  await connection.query('SELECT skills.type, skills.name, mastery FROM skills, users where skills.user_id = users.user_id and skills.user_id = 2;', async function (error: Error, results: any) {
    if (error) throw error;
    saveRedisData('skills', results);
    return res.status(200).json(results);
  });
}

export const getSocialMedia = async (req: Request, res: Response, next: NextFunction) => {
  let redisSocialMeda = await fetchRedisData('social-media');
  if (redisSocialMeda) {
    return res.status(200).json(redisSocialMeda);
  }
  const connection = await dbConnection(process.env.MYSQL_HOST ?? '', process.env.MYSQL_USERNAME ?? '', process.env.MYSQL_PASSWORD ?? '', process.env.MYSQL_DATABASE ?? '');
  connection.connect(function(err: Error) {
    if (err) throw err;
  });
  await connection.query('SELECT socialmedia.type, socialmedia.url FROM sql12595958.socialmedia, sql12595958.users where socialmedia.user_id = users.user_id and socialmedia.user_id = 2;', async function (error: Error, results: any) {
    if (error) throw error;
    saveRedisData('social-media', results);
    return res.status(200).json(results);
  });
}