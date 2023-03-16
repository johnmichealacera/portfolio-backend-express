import { fetchRedisData, getRedisClient } from '../portfolio.controller';
import Redis from "../../cache/cache.redis";
// import { softSkills, singleSoftSkill } from './softSkills.json';

jest.mock('../portfolio.controller', () => () => ({
  ...jest.requireActual('./time'), 
  getRedisClient: () => '1:11PM',
}));

describe('fetching and saving portfolio redis cache', () => {
  // it('should resolve with an error if redis is not yet started', async () => {
  //   const response = await getRedisClient();
  //   expect(response).toBeNull();
  // });

  it('test mocking', async () => {
    // const mRedis = new Redis();
    
  });

  // it('should resolve with returning the redis client if redis is started', async () => {
  //   const response = await getRedisClient();
  //   expect(response).not.toBeNull();
  // });

  // it('should resolve true and response for the hardcoded unexpired redis key', async () => {
  //   const response = await fetchRedisData('soft-skills-2')
  //     expect(response).toEqual([{"icon": "database", "name": "Database Administration", "shortDescription": "I am really good with database queries, management, security and maintenance."}, {"icon": "webApp", "name": "Custom Web Application", "shortDescription": "I will create websites that is specific for your organization. Just tell me the details and the requirement for the job."}, {"icon": "backend", "name": "Web Design", "shortDescription": "I have knowledge with CSS and bootstrap as well as responsive design so you can see to it that I will get the work done."}, {"icon": "person", "name": "Awesome personality", "shortDescription": "I am driven, motivated, passionate and is focused on any task given to me."}]);
  //     expect(response).toHaveLength(4);
  //     // Testing a single element in the array
  //     expect(response).toEqual(expect.arrayContaining([{"icon": "database", "name": "Database Administration", "shortDescription": "I am really good with database queries, management, security and maintenance."}]));
  // });

  // it('should resolve with false for invalid or expired redis key', async () => {
  //   const response = await fetchRedisData('invalidKey');
  //   expect(response).toBeFalsy();
  // });
});