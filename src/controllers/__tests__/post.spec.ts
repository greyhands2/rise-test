import request from 'supertest'

import { it, describe, expect  } from '@jest/globals';
import {app} from '../../app'

const endpoint = "/rise/posts"


describe('Post Controller tests', ()=>{

 

  it('successfully creates a post', async()=>{
    const resp = await global.register()
    
    let response = await request(app)
    .post(endpoint)
    .send({
        title: "who invented balablu bulaba?",
        content:"during the 2023 pre presidential elections campain, a certain fradulent fellow came up with a phrase that spread wide: balabluuuu, bulaba... whois?" 
    })
    .set('Authorization', `Bearer ${resp.body.data.token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Success'
    );
    
    
})



it('returns error for invalid title', async()=>{
    const resp = await global.register()
    
    let response = await request(app)
    .post(endpoint)
    .send({
        title: "",
        content:"during the 2023 pre presidential elections campain, a certain fradulent fellow came up with a phrase that spread wide: balabluuuu, bulaba... whois?" 
    })
    .set('Authorization', `Bearer ${resp.body.data.token}`);
    
    expect(response.status).toBe(400);
    
    
})

it('returns error for invalid content', async()=>{
    const resp = await global.register()
    
    let response = await request(app)
    .post(endpoint)
    .send({
        title: "who invented balablu bulaba?",
        content:"" 
    })
    .set('Authorization', `Bearer ${resp.body.data.token}`);
    
    expect(response.status).toBe(400);
    
    
})
})  



