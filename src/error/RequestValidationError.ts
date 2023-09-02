import {ErrorBlueprint} from './blueprint/ErrorBlueprint'


export class RequestValidationError extends ErrorBlueprint {
    statusCode: number = 401;
     
    constructor(public errorMessage: string, public field?: string){
        super(errorMessage)
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }


    formatErrors(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: this.errorMessage,
                field: this.field
            }

        ] 
    }
}