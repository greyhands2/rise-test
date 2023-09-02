import {Request, Response, NextFunction} from 'express'
import { UnAuthorizedError } from '../error/UnAuthorizedError'


const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.currentUser) {
        throw new UnAuthorizedError()
    }

    next()
}

export {requireAuth}