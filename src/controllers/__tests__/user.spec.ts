import request from 'supertest'

import { it, describe, expect  } from '@jest/globals';
import {app} from '../../app'

const endpoint = "/rise/users"


describe('User Controller tests', ()=>{

 

  it('successfully fetches all users', async()=>{
    const resp = await global.register()
    
    let response = await request(app)
    .get(endpoint)
    .set('Authorization', `Bearer ${resp.body.data.token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Success'
    );
    expect(Array.isArray(response.body.data)).toBeTruthy();
    expect(response.body.data.length > 0).toBeTruthy();
    
})






})  



