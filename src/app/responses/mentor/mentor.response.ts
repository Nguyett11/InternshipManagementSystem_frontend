import { UserResponse } from "../user/user.response";

export interface MentorResponse{
    id : number;
    mentor_name : string;
    company_id : number;
    company_name : string;
    position : string;
    userId : number;
    user_response: UserResponse;
}