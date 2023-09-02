import {Request, Response, NextFunction} from 'express'
import { BadRequestError } from '../error/BadRequestError'
import { NotFoundError } from '../error/NotFoundError' 
import { doesUserExist } from '../helpers/doesUserExists'




const validateCreatePostPayload = async (req: Request, res: Response, next: NextFunction) => {
    const userName: string | undefined = req.currentUser?.name


    console.log(userName)
    const {title, content} : {title:string; content: string;} = req.body

    if(!title || typeof title !== 'string' || title.trim().length < 1){
        throw new BadRequestError("Invalid title")
    }

    if(!content || typeof content !== 'string' || content.trim().length < 1){
        throw new BadRequestError("Invalid content")
    }

    if(!userName || typeof userName !== 'string' || userName.trim().length < 2){
        throw new BadRequestError("Invalid user name")
    }

    await doesUserExist(userName)
    .then((userExists)=>{
        if(!!userExists === false) {
            throw new NotFoundError()
        }
    })
    
    req.body.userName = userName
    next()
}





export {validateCreatePostPayload as postMiddleware }