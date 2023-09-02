import {ErrorBlueprint} from './blueprint/ErrorBlueprint'

const reason : string = "Ooopss!! Something Went Wrong, Please Try Again Later"

export class SomethingWentWrongError extends ErrorBlueprint {
    statusCode: number = 500;
    constructor(){
        super(reason)
        Object.setPrototypeOf(this, SomethingWentWrongError.prototype)

    }

    formatErrors(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: reason
            }
        ]
    }
}