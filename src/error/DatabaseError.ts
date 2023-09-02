import {ErrorBlueprint} from './blueprint/ErrorBlueprint'



export class DatabaseError extends ErrorBlueprint {
    statusCode: number = 500;
    constructor(public errorMessage: string){
        super(errorMessage)
        Object.setPrototypeOf(this, DatabaseError.prototype)

    }

    formatErrors(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: this.errorMessage
            }
        ]
    }
}