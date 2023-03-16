import * as redis from 'redis';

export default class Redis {
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