const express = require('express')
const router = express.Router()
const hotel = require('../controller/hotel')
const apicache = require('apicache')
const axios = require('axios')
const Redis = require('ioredis');

// Create a Redis client
const redisClient = new Redis({
  host: 'localhost', // Redis is exposed on localhost
  port: 6379,        // The exposed Redis port
});

const cache = apicache.middleware('2 minutes');

router.get('/guest',cache,hotel.guests)
router.get('/room',hotel.rooms)
router.get('/reservedall',hotel.reservedAll)

router.post('/reservation',hotel.reservation)
router.post('/select',hotel.select)
router.post('/reservedate',hotel.reservedate)

router.get('/',(req,res)=>{
    res.send("<h1>Helmet</h1>")
})

router.get('/users', async (req, res) => {
    redisClient.get('users', async (err, users) => {
      if (err) {
        console.log(err);
      } if (users != null) {
        return res.json({ from: 'redis', data: JSON.parse(users) });
      } else {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const data = response.data;
        // Use the correct function name 'setex' instead of 'setEx'
        redisClient.setex('users', 120, JSON.stringify(data));
        return res.json({ from: 'api', data: data });
      }
    });
  });

router.get('/users/:userId',async (req,res)=>{
    const userid = req.params.userId
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userid}`)
    const data = response.data
    console.log(data)
    return res.json({data:data})
})

module.exports = router