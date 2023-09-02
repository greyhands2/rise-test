import {Request, Response, NextFunction} from 'express'
import { BadRequestError } from '../error/BadRequestError' 
import { DuplicateError } from '../error/DuplicateDataError'

import { doesUserExist } from '../helpers/doesUserExists'


const validateRegisterPayload = async (req: Request, res: Response, next: NextFunction) => {
    const {name, password, confirmPassword}:{name:string; password: string; confirmPassword: string} = req.body

    if(!name || typeof name !== 'string' || name.trim().length < 2){
        throw new BadRequestError("Invalid name")
    }

    if(!password || typeof password !== 'string' || password.trim().length < 6){
        throw new BadRequestError("Password length must be at least 6 characters")
    }

    if(!confirmPassword || password !== confirmPassword){
        throw new BadRequestError("Password and Confirm Password field inputs must match")
    }

    await doesUserExist(name)
    .then((userExists)=>{
        
        if(!!userExists === true) {
            console.log("throwing this")
            throw new DuplicateError("User Already Exists")
        }
    })
    

    next()
}



export {validateRegisterPayload as registerMiddleware}