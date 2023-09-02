import { User } from "../../models/User";

interface UserWithToken extends User {
    
    token?: any;
    
}


export {UserWithToken}


