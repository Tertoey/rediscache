const mysql = require('mysql2')
require('dotenv').config()

const dbConnect = mysql.createPool({
    host     : process.env.DB_host,
    port     : process.env.DB_port,
    user     : process.env.DB_user,
    password : process.env.mysql_pass,
    database :process.env.DB_name,
    connectionLimit: process.env.DB_limit
})

module.exports = dbConnect