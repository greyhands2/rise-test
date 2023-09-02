import {NextFunction, Request, Response} from 'express'

import { Password } from './helper/Password'
import { User } from '../models/User'
import { createToken } from './helper/jwt/createToken'
import { catchAsyncError } from '../helpers/catchAsyncError'
import { redis_client } from '../db/redis'



const register = catchAsyncError( async (req: Request, res: Response, next: NextFunction) : Promise<Response> => {
    const {name, password} = req.body

    const hashed = await Password.toHash(password)
    
    const newUser: User = await User.create({
        name: name,
        password: hashed

    })

    

    const token: any = await createToken(newUser)
    
    newUser.dataValues.token = token
    delete newUser.dataValues.password
    
    let cachedUsers = await redis_client.client.get('all-users')

    if(cachedUsers){
        cachedUsers = JSON.parse(cachedUsers)
        cachedUsers.push(newUser)
        await redis_client.client.del('all-users')
        await redis_client.client.set('all-users', JSON.stringify(cachedUsers))
    }
    
    return res.status(200).send({
        message: "Success",
        data: newUser
    })

});


export {register}