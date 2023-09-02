export abstract class ErrorBlueprint extends Error {
    abstract statusCode : number //let's ensure every other class using inheriting class must have a statusCode
    constructor(message : string, field? : string){
        super(message) //call class Error's constructor
        Object.setPrototypeOf(this, ErrorBlueprint.prototype)//ensure the current instance's prototype is same as that of class CustomError
    }


   

    abstract formatErrors(): {message : string; field? : string }[] // a method that should return array of objects
}