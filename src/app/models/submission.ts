import { Grading } from "./grading";

export interface Submission{
    id: number;
    student_name: string;
    student_class: string;
    report_id: number;
    student_code: number;
    file: string;
    submission_date: Date;
    status: string;
    //grading: Grading;
}