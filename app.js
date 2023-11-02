const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const hotel = require('./route/hotel')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
require('dotenv').config()

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 10,
  })

  app.get('/roomss', (req, res) => {
    res.status(200).send('Room route accessed');
  });

app.use(limiter)
app.set('trust proxy', 1)
app.use(express.static('public'))

app.use(cors())
app.use(helmet())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.use(hotel)
 
module.exports = app