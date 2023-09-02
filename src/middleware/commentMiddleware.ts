import {Request, Response, NextFunction} from 'express'
import { BadRequestError } from '../error/BadRequestError'
import { NotFoundError } from '../error/NotFoundError' 
import { doesUserExist } from '../helpers/doesUserExists'
import { doesPostExist } from '../helpers/doesPostExist'



const validateCreateCommentPayload = async (req: Request, res: Response, next: NextFunction) => {
    const userName: string | undefined = req.currentUser?.name
    const {text, postId}: {text:string; postId: number;} = req.body

    if(!text || typeof text !== 'string' || text.trim().length < 1){
        throw new BadRequestError("Invalid text")
    }

    if(!postId || typeof postId !== 'number' || postId < 1){
        throw new BadRequestError("Invalid postId")
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
    


    await doesPostExist(postId)
    .then((postExists)=>{
        if(!!postExists === false) {
            throw new NotFoundError()
        }
    })
    

    req.body.userName = userName
    next()
}





export {validateCreateCommentPayload as commentMiddleware }