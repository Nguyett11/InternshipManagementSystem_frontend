import{
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsDate
} from 'class-validator'

export class RegisterDTO {
    @IsString()
    full_name: string;

    @IsString()
    email: string;

    @IsPhoneNumber( )
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    retype_password: string;

    @IsDate()
    date_of_birth: Date;

    @IsString()
    gender: string;

    @IsString()
    desired_role: string;

    role_id: number=5;
    constructor(data: any) {
        this.full_name = data.full_name;
        this.email = data.email;
        this.phone_number = data.phone_number;
        this.password = data.password;
        this.retype_password = data.retype_password;
        this.gender = data.gender;
        this.desired_role = data.desired_role;
        this.date_of_birth = new Date();
        this.role_id = data.role_id || 5;
    }
}