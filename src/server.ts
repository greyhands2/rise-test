
import dotenv from 'dotenv'

import {app} from './app'
import { sequelize } from './db/sequelize';
import { redis_client } from './db/redis';
dotenv.config({ path: './config.env' });

   
    sequelize().sync()
    
    redis_client.connect()
    redis_client.client.on('close', ()=>{
        console.log('redis connection closed')
    })


const port = process.env.APP_PORT || 3300



app.listen(port, ()=>{
    console.log(`app runs  on port ${port}`)
})





