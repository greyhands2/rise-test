import {Request, Response, NextFunction } from 'express'
import {ErrorBlueprint} from '../blueprint/ErrorBlueprint'
export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) : Response => {
    if( err instanceof ErrorBlueprint){
        return res.status(err.statusCode).send({errors: err.formatErrors()})
    }

    console.log('erozzz',err)
    return res.status(400).send({
        errors: [{message: "Something went wrong"}]
    })
}


