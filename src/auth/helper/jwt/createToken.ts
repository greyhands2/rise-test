import jwt from 'jsonwebtoken'


import { UserWithToken } from '../UserWithToken'
const createToken = (user: UserWithToken) =>{
    
    return new Promise((resolve,reject)=>{
        
        let token: string = jwt.sign({
            id: user.id, 
            name: user.name
           }, process.env.JWT_KEY);

           resolve(token)
    })
     
}


export {createToken}
