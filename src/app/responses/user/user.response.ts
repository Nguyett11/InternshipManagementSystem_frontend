import { Role } from "../../models/role";
export interface UserResponse {
    user_id: number;
    full_name: string;
    email: string;
    phone_number: string;
    gender: string;
    date_of_birth: Date;
    desired_role: string;
    is_active: boolean;
    role: Role;    
}

