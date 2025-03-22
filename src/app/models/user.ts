import { Role } from "./role";

export interface User {
   id : number;
   full_name : string;
   email : string;
   phone_number: string;
   gender : string;
   date_of_birth : Date;
   desired_role : string;
   password : string;
   is_active : boolean;
   role: Role;
}