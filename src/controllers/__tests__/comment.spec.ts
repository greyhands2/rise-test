import request from 'supertest'

import { it, describe, expect  } from '@jest/globals';
import {app} from '../../app'

const endpoint = "/rise/comments"


describe('Comment Controller tests', ()=>{

 

  it('successfully creates a comment', async()=>{
    const resp = await global.register()
    
    let resCreatePost = await request(app)
    .post("/rise/posts")
    .send({
        title: "who invented balablu bulaba?",
        content:"during the 2023 pre presidential elections campain, a certain fradulent fellow came up with a phrase that spread wide: balabluuuu, bulaba... whois?" 
    })
    .set('Authorization', `Bearer ${resp.body.data.token}`);
    

    let response = await request(app)
    .post(endpoint)
    .send({
        text: "Bola Ahmed Tinunbu",
        postId: resCreatePost.body.data.id
    })
    .set('Authorization', `Bearer ${resp.body.data.token}`);




    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Success'
    );
    
    
})



it('returns error for invalid text', async()=>{
    const resp = await global.register()
    
    let resCreatePost = await request(app)
    .post("/rise/posts")
    .send({
        title: "who invented balablu bulaba?",
        content:"during the 2023 pre presidential elections campain, a certain fradulent fellow came up with a phrase that spread wide: balabluuuu, bulaba... whois?" 
    })
    .set('Authorization', `Bearer ${resp.body.data.token}`);
    

    let response = await request(app)
    .post(endpoint)
    .send({
        text: "",
        postId: resCreatePost.body.data.id
    })
    .set('Authorization', `Bearer ${resp.body.data.token}`);


    
    expect(response.status).toBe(400);
    
    
})

it('returns error for invalid postId', async()=>{
    const resp = await global.register()
    
    let resCreatePost = await request(app)
    .post("/rise/posts")
    .send({
        title: "who invented balablu bulaba?",
        content:"during the 2023 pre presidential elections campain, a certain fradulent fellow came up with a phrase that spread wide: balabluuuu, bulaba... whois?" 
    })
    .set('Authorization', `Bearer ${resp.body.data.token}`);
    

    let response = await request(app)
    .post(endpoint)
    .send({
        text: "Bola Ahmed Tinunbu",
        postId: 0
    })
    .set('Authorization', `Bearer ${resp.body.data.token}`);

    expect(response.status).toBe(400);
    
    
})
})  



