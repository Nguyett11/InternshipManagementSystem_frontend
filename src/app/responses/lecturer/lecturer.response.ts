import { UserResponse } from "../user/user.response";

export interface LecturerResponse{
    id: number;
    lecturer_name: string;
    department: string;
    user_response: UserResponse;
}