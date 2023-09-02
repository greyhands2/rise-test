import { createClient } from 'redis';
class REDIS_CLIENT {
   private redisClient: ReturnType<typeof createClient>

   get client(){
    if(!this.redisClient){
        throw new Error('Cannot access redis client before connecting')
    }

    return this.redisClient;
   }

   connect():Promise<void>{
        this.redisClient = createClient({
            url: process.env.REDIS_URL 
        });
        this.redisClient.connect()
        return new Promise((res, rej)=>{
            
    
            this.client.on('connect', function() {
                console.log('Redis server online.');
                res()
            });
            this.client.on('error', function (err: Error) {
                console.error('Redis error:', err);
                rej(err)
            });  
        })
   }

   quit(){
        this.redisClient.quit((err: Error)=>{
            if (err) {
                throw new Error(err.message)
              } 
        })
   }
    
}


export const redis_client = new REDIS_CLIENT()