import {ErrorBlueprint} from './blueprint/ErrorBlueprint'

const errorMessage: string = "You are Threading on Unauthorized Waters"
export class UnAuthorizedError extends ErrorBlueprint {
    statusCode: number = 401;
     
    constructor(){
        super(errorMessage)
        Object.setPrototypeOf(this, UnAuthorizedError.prototype)
    }


    formatErrors(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: errorMessage
            }
        ]
    }
}