import { NgIf } from '@angular/common';
import {
   Component, ViewChild 
  } from '@angular/core';
import { 
  FormsModule, NgForm 
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  // Khai báo các biến dữ liệu tương ứng với các trường dữ liệu trong form
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  retype_password: string;
  date_of_birth: Date;
  desired_role: string;
  gender: string;

  // Trạng thái hiển thị mật khẩu
  rememberMe: boolean = false; 
  constructor(private router: Router, private userService: UserService) {
    this.full_name = 'Bùi Ánh Nguyệt';
    this.email= 'nguyet3@gmail.com';
    this.phone_number = '0365355529';
    this.password = '123456';
    this.retype_password = '123456';
    this.gender = 'Nam';
    this.desired_role = 'Lecturer';
    this.date_of_birth = new Date(2022-11-11);
  }

  register() {

    const val: any = {
    full_name : this.full_name,
    email : this.email,
    phone_number: this.phone_number,
    gender : this.gender,
    date_of_birth : this.date_of_birth,
    desired_role : this.desired_role,
    password : this.password,
    is_active : false,
    role_id : 0   
    };

    console.log(val);

    this.userService.register(val).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          alert('Đăng ký thành công! ID: ' + res.user_id);
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Đăng ký thất bại!');
      }
    });
  }

  check_passwords_match() {
    if (this.password !== this.retype_password) {
      this.registerForm.form.controls['retype_password'].setErrors({ 'passwordMismatch': true });
    } else {
      this.registerForm.form.controls['retype_password'].setErrors(null);
    }
  }
  toggle_password_visibility() {
    const type = this.rememberMe ? 'text' : 'password';
    (document.getElementById('password') as HTMLInputElement).type = type;
    (document.getElementById('retype_password') as HTMLInputElement).type = type;
  }  
}
