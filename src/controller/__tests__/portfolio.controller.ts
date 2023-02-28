import { fetchRedisData } from '../portfolio.controller';
import { softSkills, singleSoftSkill } from './softSkills.json';

describe('auth', () => {
  it('should resolve true and response for the hardcoded unexpired redis key', async () => {
    const response = await fetchRedisData('soft-skills-2')
      expect(response).toEqual(softSkills);
      expect(response).toHaveLength(4);
      // Testing a single element in the array
      expect(response).toEqual(expect.arrayContaining(singleSoftSkill));
  })

  it('should resolve with false for invalid or expired redis key', async () => {
    const response = await fetchRedisData('invalidKey')
    expect(response).toBeFalsy()
  })
})