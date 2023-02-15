import * as redis from 'redis';

export class Redis {
  client;
 
  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_STRING_URL,
      // Todo: find a way to make this work
      // expire: 60
    });
  }
 
  getClient() {
    return this.client;
  }
}