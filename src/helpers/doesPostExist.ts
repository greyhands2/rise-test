
import { Post } from "../models/Post";
import { DatabaseError } from "../error/DatabaseError";

const doesPostExist = async (id: number): Promise<boolean> => {

    try {

        const postExists = await Post.findByPk(id)
        return !!postExists

    } catch(error:any) {
        throw new DatabaseError(error.message)
    }

    
}


export {doesPostExist}
