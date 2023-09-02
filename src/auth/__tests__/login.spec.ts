import request from 'supertest'

import { it, describe, expect  } from '@jest/globals';
import {app} from '../../app'

const endpoint = "/rise/auth/login"
const newUser = {
    name: 'apollos1234',
    password: 'P4ssword',
   
  };
const loginCustomer = (user = newUser) => {
    return request(app)
      .post(endpoint)
      .send(user);
  };

describe('User Login tests', ()=>{

 

  it('successfully logs in a user and returns 200 status', async()=>{
    const resp = await global.register()
    const user = {
      name: resp.body.data.name,
      password: 'P4ssword',
     
    }
    let response = await loginCustomer(user);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Success'
    );
    expect(response.body.data.token).toBeTruthy();
    
})

it('returns a 400 with an invalid name', async()=>{
    return request(app)
    .post(endpoint)
    .send({
        name: 'o',
        password: 'P4ssword',
        
      })
    .expect(400);
})


it('returns a 400 with an invalid password', async()=>{
    return request(app)
    .post(endpoint)
    .send({
        name: 'osas1234',
        password: 'P4'
      })
    .expect(400);
})




})  



