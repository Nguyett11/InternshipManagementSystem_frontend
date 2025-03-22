import { 
    IsString, 
    IsNotEmpty, 
    IsDate 
} from 'class-validator';

export class UpdateReportDTO {  
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDate()
    @IsNotEmpty()
    due_date: Date;

    constructor(data: any) {
        this.title = data.title;
        this.description = data.description;    
        this.due_date = new Date(data.due_date);
    }
}
