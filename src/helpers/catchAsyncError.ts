import {Request, Response, NextFunction} from 'express'

const catchAsyncError = (fn: Function) => {
    return (req: Request, res: Response, next:NextFunction) => {
        fn(req, res, next).catch((error: Error)=> {console.log('dreeor', error);next(error.message)})//give a generic error for now
    }
}

export {catchAsyncError}