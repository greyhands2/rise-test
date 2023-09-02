import {ErrorBlueprint} from './blueprint/ErrorBlueprint'



export class BadRequestError extends ErrorBlueprint {
    statusCode: number = 400;
   
    constructor(public errorMessage: string){ //auto initialise and set variable errorMessage 
        super(errorMessage)
        

        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    
    formatErrors(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: this.errorMessage
            }
        ]
    }
}