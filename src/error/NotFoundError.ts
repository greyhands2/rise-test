import {ErrorBlueprint} from './blueprint/ErrorBlueprint'


const errorMessage: string = "Not Found"

export class NotFoundError extends ErrorBlueprint {
    statusCode: number = 404;
    constructor(){
        super(errorMessage)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }


    formatErrors(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: errorMessage
            }
        ]
    }

}