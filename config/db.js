const {Pool}=require('pg')

console.log('Connecting to database...');
 // Create a new pool instance
 // Load environment variables from .env file

require('dotenv').config();
 const pool=new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
 })

module.exports={pool}