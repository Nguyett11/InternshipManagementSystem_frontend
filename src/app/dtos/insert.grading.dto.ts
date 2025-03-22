import { 
    IsString, 
    IsNotEmpty
} from 'class-validator';

export class InsertGradingDTO {
    @IsString()
    @IsNotEmpty()
    grade: string;

    @IsString()
    @IsNotEmpty()
    feedback: string;


    constructor(data: any) {
        this.grade = data.grade;
        this.feedback = data.feedback;    
    }
}