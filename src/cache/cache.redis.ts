import * as redis from 'redis';

export class Redis {
  client;
 
  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_STRING_URL,
    });
  }
 
  getClient() {
    return this.client;
  }
}