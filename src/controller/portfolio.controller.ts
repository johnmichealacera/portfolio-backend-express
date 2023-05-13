import { NextFunction, Request, Response } from "express";
import Redis from "../cache/cache.redis";
import DbConnection from '../database/db';
import HardSkillModel from "../database/model/HardSkill";
import PersonalModel from "../database/model/Personal";
import ProjectModel from "../database/model/Project";
import SkillOverviewModel from "../database/model/SkillOverview";
import SocialMediaModel from "../database/model/SocialMedia";
import SoftSkillModel from "../database/model/SoftSkill";
import UserModel from "../database/model/User";
import MongoDbConnection from "../database/mongodb";

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

// export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
//   const { userEmail } = req?.params;
//   const { userId } = await getUserId(userEmail) as any;
//   let redisProjects = await fetchRedisData(`projects-${userId}`);
//   if (redisProjects) {
//     return res.status(200).json(redisProjects);
//   }
//   const database = new DbConnection();
//   const sqlParams = [userId];
//   const sql = 'SELECT title, description, url, background_image as imageLink FROM project_info, users_info where project_info.user_id = users_info.user_id and project_info.user_id = ?;';
//   const rows = await database.query(sql, sqlParams)
//     .then((rows) => rows)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
//   saveRedisData(`projects-${userId}`, rows);
//   return res.status(200).json(rows);
// }

// export const getIntroductions = async (req: Request, res: Response, next: NextFunction) => {
//   const { userEmail } = req?.params;
//   const { userId } = await getUserId(userEmail) as any;
//   let redisData = await fetchRedisData(`introductions-${userId}`);
//   if (redisData) {
//     return res.status(200).json(redisData);
//   }
//   const database = new DbConnection();
//   const sqlParams = [userId];
//   const sqlExpertise = 'SELECT title, icon FROM skill_overview_info, users_info where skill_overview_info.user_id = users_info.user_id and users_info.user_id=?;';
//   const introductionObj = {
//     expertise: [],
//     fullName: '',
//     jobDescription: '',
//   };
//   introductionObj.expertise = await database.query(sqlExpertise, sqlParams)
//     .then((rows) => rows)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//   });
//   const sqlUserData = 'SELECT users_info.full_name as fullName, personal_info.job_description as jobDescription FROM personal_info, users_info where personal_info.user_id=users_info.user_id and personal_info.user_id=?;';
//   const personInfo = await database.query(sqlUserData, sqlParams)
//     .then((rows) => rows)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//   });
//   introductionObj.fullName = personInfo[0]?.fullName;
//   introductionObj.jobDescription = personInfo[0]?.jobDescription;
//   saveRedisData(`introductions-${userId}`, introductionObj);
//   return res.status(200).json(introductionObj);
// }

// export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
//   const { userEmail } = req?.params;
//   const { userId } = await getUserId(userEmail) as any;
//   let redisData = await fetchRedisData(`skills-${userId}`);
//   if (redisData) {
//     return res.status(200).json(redisData);
//   }
//   const database = new DbConnection();
//   const sqlParams = [userId];
//   const sql = 'SELECT skill_type as type, name, mastery FROM hard_skills_info, users_info where hard_skills_info.user_id = users_info.user_id and hard_skills_info.user_id = ?;';
//   const rows = await database.query(sql, sqlParams)
//     .then((rows) => rows)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//   });
//   saveRedisData(`skills-${userId}`, rows);
//   return res.status(200).json(rows);
// }

// export const getSocialMedia = async (req: Request, res: Response, next: NextFunction) => {
//   const { userEmail } = req?.params;
//   const { userId } = await getUserId(userEmail) as any;
//   let redisData = await fetchRedisData(`social-media-${userId}`);
//   if (redisData) {
//     return res.status(200).json(redisData);
//   }
//   const database = new DbConnection();
//   const sqlParams = [userId];
//   const sql = 'SELECT type, url FROM social_media_info, users_info where social_media_info.user_id = users_info.user_id and social_media_info.user_id = ?;';
//   const rows = await database.query(sql, sqlParams)
//     .then((rows) => rows)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//   });
//   saveRedisData(`social-media-${userId}`, rows);
//   return res.status(200).json(rows);
// }

// export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
//   const { userEmail } = req?.params;
//   const { userId } = await getUserId(userEmail) as any;
//   let redisData = await fetchRedisData(`user-info-${userId}`);
//   if (redisData) {
//     return res.status(200).json(redisData);
//   }
//   const database = new DbConnection();
//   const sqlParams = [userId];
//   const sql = 'Select job_description as jobDescription, life_story as lifeStory, why_do_this as userWhy, background_url as bgUrl FROM personal_info, users_info where personal_info.user_id = users_info.user_id and users_info.user_id = ?;';
//   const rows = await database.query(sql, sqlParams)
//     .then((rows) => rows)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//   });
//   saveRedisData(`user-info-${userId}`, rows?.[0]);
//   return res.status(200).json(rows?.[0]);
// }

export const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  const { userEmail } = req?.params;
  let redisData = await fetchRedisData(`user-details-${userEmail}`);
  if (redisData) {
    return res.status(200).json(redisData);
  }
  const database = new DbConnection();
  const sqlParams = [userEmail];
  const sql = 'SELECT user_id as userId, full_name as fullName, email, contact_number as contactNumber FROM users_info where email = ?;';
  const rows = await database.query(sql, sqlParams)
    .then((rows) => rows)
    .catch((error) => {
      console.error(error);
      throw error;
  });
  saveRedisData(`user-details-${userEmail}`, rows?.[0]);
  return res.status(200).json(rows?.[0]);
}

export const getUserId = async (userEmail: string) => {
  const database = new DbConnection();
  const sqlParams = [userEmail];
  const sql = 'SELECT user_id as userId, full_name as fullName, email, contact_number as contactNumber FROM users_info where email = ?;';
  const rows = await database.query(sql, sqlParams)
    .then((rows) => rows)
    .catch((error) => {
      console.error(error);
      throw error;
  });
  return rows?.[0];
}

// export const getSoftSkills = async (req: Request, res: Response, next: NextFunction) => {
//   const { userEmail } = req?.params;
//   const { userId } = await getUserId(userEmail) as any;
//   let redisData = await fetchRedisData(`soft-skills-${userId}`);
//   if (redisData) {
//     return res.status(200).json(redisData);
//   }
//   const database = new DbConnection();
//   const sqlParams = [userId];
//   const sql = 'SELECT name , description as shortDescription, icon FROM soft_skill, users_info where soft_skill.user_id = users_info.user_id and soft_skill.user_id = ?;';
//   const rows = await database.query(sql, sqlParams)
//     .then((rows) => rows)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//   });
//   saveRedisData(`soft-skills-${userId}`, rows);
//   return res.status(200).json(rows);
// }

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userEmail } = req?.params;
    let redisData = await fetchRedisData(`user-info-${userEmail}`);
    if (redisData) {
      return res.status(200).json(redisData);
    }
    const dataConnection = new MongoDbConnection();
    const data = await dataConnection.query(UserModel, {email: userEmail});
    if (data.length > 0) {
      saveRedisData(`user-info-${userEmail}`, data?.[0]);
    }
    res.json(data?.[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSoftSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userEmail } = req?.params;
    let redisData = await fetchRedisData(`soft-skills-${userEmail}`);
    if (redisData) {
      return res.status(200).json(redisData);
    }
    const dataConnection = new MongoDbConnection();
    const data = await dataConnection.query(SoftSkillModel, { email: userEmail});
    if (data.length > 0) {
      saveRedisData(`soft-skills-${userEmail}`, data);
    }
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSocialMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userEmail } = req?.params;
    let redisData = await fetchRedisData(`social-media-${userEmail}`);
    if (redisData) {
      return res.status(200).json(redisData);
    }
    const dataConnection = new MongoDbConnection();
    const data = await dataConnection.query(SocialMediaModel, {email: userEmail});
    if (data.length > 0) {
      saveRedisData(`social-media-${userEmail}`, data);
    }
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userEmail } = req?.params;
    let redisData = await fetchRedisData(`skills-${userEmail}`);
    if (redisData) {
      return res.status(200).json(redisData);
    }
    const dataConnection = new MongoDbConnection();
    const data = await dataConnection.query(HardSkillModel, {email: userEmail});
    if (data.length > 0) {
      saveRedisData(`skills-${userEmail}`, data);
    }
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getIntroductions = async (req: Request, res: Response, next: NextFunction) => {
  const { userEmail } = req?.params;
  let redisData = await fetchRedisData(`introductions-${userEmail}`);
  if (redisData) {
    return res.status(200).json(redisData);
  }
  const introductionObj = {
    expertise: [],
    fullName: '',
    jobDescription: {},
  };
  const skillOverview: any = await getSkillOverview(req, res, next);
  introductionObj.expertise = skillOverview;
  const userInfo: any = await getUserInfo(req, res, next);
  introductionObj.fullName = userInfo?.fullName;
  const personalData: any = await getPersonal(req, res, next);
  introductionObj.jobDescription = personalData?.jobDescription;
  if (introductionObj?.fullName) {
    saveRedisData(`introductions-${userEmail}`, introductionObj);
  }

  return res.status(200).json(introductionObj);
}

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  const { userEmail } = req?.params;
  let redisProjects = await fetchRedisData(`projects-${userEmail}`);
  if (redisProjects) {
    return res.status(200).json(redisProjects);
  }
  const dataConnection = new MongoDbConnection();
  const data = await dataConnection.query(ProjectModel, {email: userEmail});
  if (data.length > 0) {
    saveRedisData(`projects-${userEmail}`, data);
  }
  return res.status(200).json(data);
}

export const getSkillOverview = async (req: Request, res: Response, next: NextFunction) => {
  const { userEmail } = req?.params;
  let redisProjects = await fetchRedisData(`skill-overview-${userEmail}`);
  if (redisProjects) {
    return res.status(200).json(redisProjects);
  }
  const dataConnection = new MongoDbConnection();
  const data = await dataConnection.query(SkillOverviewModel, {email: userEmail});
  if (data.length > 0) {
    saveRedisData(`skill-overview-${userEmail}`, data);
  }
  return res.status(200).json(data);
}

export const getPersonal = async (req: Request, res: Response, next: NextFunction) => {
  const { userEmail } = req?.params;
  let redisProjects = await fetchRedisData(`personal-${userEmail}`);
  if (redisProjects) {
    return res.status(200).json(redisProjects);
  }
  const dataConnection = new MongoDbConnection();
  const data = await dataConnection.query(PersonalModel, {email: userEmail});
  if (data.length > 0) {
    saveRedisData(`personal-${userEmail}`, data?.[0]);
  }
  return res.status(200).json(data?.[0]);
}