import * as redis from 'redis';

export default class Redis {
  client: any;
 
  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_STRING_URL,
    });
  }
 
  getClient() {
    return this.client;
  }
  async killRedis(err: any) {
    const client = await this.getClient();
    // console.error('Error in opening redis', err);
    
    client.quit();
  }
  async subscribe() {
    return new Promise(async (resolve, reject) => {
      const client = await this.getClient();
      client.on('error',  async (err: any) => {
        await this.killRedis(err);
        reject(err);
      });
      resolve(await client.connect());
  })};
}