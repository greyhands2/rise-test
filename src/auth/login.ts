import {Request, Response, NextFunction} from 'express'
import { catchAsyncError } from '../helpers/catchAsyncError'
import { Password } from './helper/Password'
import { User } from '../models/User'
import { NotFoundError } from '../error/NotFoundError'
import { RequestValidationError } from '../error/RequestValidationError'
import { UserWithToken } from './helper/UserWithToken'
import { createToken } from './helper/jwt/createToken'

const login = catchAsyncError( async(req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const {name, password} = req.body
    
    const foundUser: User | null = await User.findOne({where:{ name}})
    if(!!foundUser === false) throw new NotFoundError()
    const doPasswordMatch: boolean = await Password.compare(foundUser!.password, password)

    if(!doPasswordMatch) throw new RequestValidationError("name or password is incorrect") 

    const token: any = await createToken(foundUser!)
   
    foundUser!.dataValues.token = token
    delete foundUser!.dataValues.password
    
    return res.status(200).send({
        message: "Success",
        data: foundUser
    })


})


export {login}