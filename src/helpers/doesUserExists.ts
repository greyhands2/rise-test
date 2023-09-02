import { User } from "../models/User";

import { DatabaseError } from "../error/DatabaseError";  
const doesUserExist = async (name: string): Promise<boolean> => {

    try {

        const userExists = await User.findByPk(name)
        return !!userExists

    }  catch(error:any) {
        throw new DatabaseError(error.message)
    }

    
}




export {doesUserExist }
