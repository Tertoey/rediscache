const Redis = require('ioredis');

// Create a Redis client
const redisClient = new Redis({
  host: 'localhost', // Redis is exposed on localhost
  port: 6379,        // The exposed Redis port
});

// Example: set a key-value pair
redisClient.set('exampleKey', 'exampleValue');

// Example: get the value for a key
redisClient.get('exampleKey', (err, result) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Value:', result);
  }
});

// Close the Redis connection
redisClient.quit();
