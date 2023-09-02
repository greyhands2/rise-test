import { ErrorBlueprint } from "./blueprint/ErrorBlueprint"

export class DuplicateError extends ErrorBlueprint {
    statusCode: number = 409;

    constructor(public errorMessage: string){
        super(errorMessage)
        Object.setPrototypeOf(this, DuplicateError.prototype)

    }

    formatErrors(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: this.errorMessage
            }
        ]
    }
}