import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { RequestValidationError } from "../../../error/RequestValidationError";
interface UserPayload {
    name: string;
    id: string;
}

// in typescript to be able to inject new data into express' request object we have to do this
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.body.token) {
        token = req.body.token;
    }
    

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY) as UserPayload

        req.currentUser = payload
    } catch(e) {
        //do nothing
    }
    next()

}


export {validateToken}