import { Submission } from "./submission";

export interface report {
    report_id: number;
    title: string;
    description: string;
    create_date : Date;
    due_date: Date;
    lecturer_id: number;
    submission?: Submission;
}