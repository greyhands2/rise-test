import {Request, Response, NextFunction} from 'express'
import { BadRequestError } from '../error/BadRequestError' 
const validateLoginPayload = (req: Request, res: Response, next: NextFunction) => {
    const {name, password}:{name: string; password: string} = req.body

    if(!name || !password || name.trim().length < 2 || password.trim().length < 6){
        throw new BadRequestError("Invalid Email or Password")
    }

    next()
}

export {validateLoginPayload as loginMiddleware}
