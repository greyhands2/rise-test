import { it, describe, afterAll, beforeEach, afterEach, beforeAll } from '@jest/globals';
import * as  dotenv from 'dotenv';
import * as path from 'path';
//dotenv.config({ path: '../../config.env'})

import { sequelize } from './sequelize';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';


import { redis_client } from '../db/redis';
import request, {Response} from 'supertest'


import {app} from '../app'
declare global {
  function register():Promise<Response>;
  
      
}
const endpoint = "/rise/auth/register"
const newUser = {
    name: 'apkporjotor1234',
    password: 'P4ssword',
    confirmPassword:'P4ssword'
};


   



  // Set up Jest hooks for database creation and teardown
beforeAll(async () => {
  process.env.REDIS_URL = 'redis://:Level5acess200@localhost:6379' 
  process.env.JWT_KEY='uyqt7267e6236e878723'
  await redis_client.connect()
  await redis_client.client.on('close', ()=>{
    console.log('redis connection closed')
  })
  await sequelize().authenticate();
  await sequelize().sync({ force: true }); // Re-create the tables
});

afterAll(async () => {
  // Disconnect from the test database after running tests
  await sequelize().close();
  redis_client.quit()
});

beforeEach(async () => {
  // Empty (truncate) the User, Post, and Comment tables before each test
  await User.destroy({ where: {} });
  await Post.destroy({ where: {} });
  await Comment.destroy({ where: {} });
});


global.register = async (): Promise<Response> =>{
  const response =   await request(app)
      .post(endpoint)
      .send(newUser);

      return response
}

