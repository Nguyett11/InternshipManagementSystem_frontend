import {
    IsString, 
    IsNotEmpty, 
    IsEmail, 
    IsDate
} from 'class-validator';

export class LoginDTO {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    user_id: number;

    constructor(data: any) {
        this.email = data.email;
        this.password = data.password;
        this.user_id = data.user_id;
    }
}