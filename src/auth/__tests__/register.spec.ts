import request from 'supertest'

import { it, describe, expect  } from '@jest/globals';
import {app} from '../../app'



describe('User Registration tests', ()=>{

 

  it('successfully registers a user and returns 200 status', async()=>{
    let response = await global.register();
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Success'
    );
    
})

it('returns a 400 with an invalid name', async()=>{
    return request(app)
    .post('/rise/auth/register')
    .send({
        name: 'o',
        password: 'P4ssword',
        confirmPassword: 'P4ssword',
      })
    .expect(400);
})


it('returns a 400 with an invalid password', async()=>{
    return request(app)
    .post('/rise/auth/register')
    .send({
        name: 'osas1234',
        password: 'P4',
        confirmPassword: 'P4',
      })
    .expect(400);
})



it('returns a 400 with unmatching password and confirmPassword', async()=>{
    return request(app)
    .post('/rise/auth/register')
    .send({
        name: 'osas1234',
        password: 'P4rwewer',
        confirmPassword: 'P4werwe4wr45r',
      })
    .expect(400);
})
})  



