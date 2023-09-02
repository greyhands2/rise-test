import {Request, Response, NextFunction} from 'express'
import { User } from '../models/User'
import { catchAsyncError } from '../helpers/catchAsyncError'
import { redis_client } from '../db/redis'

const allUsers = catchAsyncError( async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
    let result
    

    const cachedUsers = await redis_client.client.get('all-users')

    if(cachedUsers){
        result = JSON.parse(cachedUsers)
    } else {
        const users : User[] = await User.findAll({attributes: { exclude: ['password'] },});
        result = users
        await redis_client.client.set('all-users', JSON.stringify(users))
    }
    return res.status(200).send({
        message: "Success",
        data: result
    }) 

})

export {allUsers}