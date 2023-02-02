const redis = require('redis');

class Redis {
  client;
 
  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_STRING_URL,
      expire: 60
    });
  }
 
  getClient() {
    return this.client;
  }
}

module.exports = { Redis };