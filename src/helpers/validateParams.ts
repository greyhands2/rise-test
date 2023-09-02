
import {Request, Response, NextFunction} from 'express'
import { BadRequestError } from '../error/BadRequestError'

const validateID =async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)
    console.log(id)
    if(!req.params.id || typeof id !== 'number' || isNaN(id) || id < 1) {
        throw new BadRequestError("Invalid params")
    }
    

    next()
}

const validateName =async (req: Request, res: Response, next: NextFunction) => {
    
    if(!req.params.name || typeof req.params.name !== 'string' || req.params.name.length < 2) {
        throw new BadRequestError("Invalid params")
    }
    

    next()
}

export {validateID, validateName}