import { UserResponse } from "../user/user.response";

export interface StudentResponse{
    student_code: number;
    student_name: string;
    class_student: string;
    major: string;
    year_of_study: number;
    company_name: string;
    company_supervisor_name: string;
    supervisor_name: string;
    start_date: Date;
    end_date: Date;
    language: string;
    position: string;
    student_status:string;
    user_response: UserResponse;
}