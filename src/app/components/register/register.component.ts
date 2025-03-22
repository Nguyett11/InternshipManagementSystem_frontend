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
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  // Khai báo các biến dữ liệu tương ứng với các trường dữ liệu trong form
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  retypePassword: string;
  dateOfBirth: Date;
  desiredRole: string;
  gender: string;
  constructor(private router: Router, private userService: UserService) {
    this.fullName = '';
    this.email= '';
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.gender = '';
    this.desiredRole = '';
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear())
    //inject tạo ra một đối tượng trong class
  }
  register() {
    const message = `fullName: ${this.fullName}` +
      `phoneNumber: ${this.phoneNumber}` +
      `password: ${this.password}` +
      `retypePassword: ${this.retypePassword}` +
      `gender: ${this.gender}` +
      `desired_role: ${this.desiredRole}` +
      `dateOfBirth = ${this.dateOfBirth}`

    const registerDTO: RegisterDTO = {
      "full_name": this.fullName,
      "email": this.email,
      "phone_number": this.phoneNumber,
      "gender": this.gender,
      "desired_role": this.desiredRole,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "role_id": 5
    }
    debugger
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        const confirmation = window
          .confirm('Đăng ký thành công, bạn hãy chờ ADMIN cho phép và cấp quyền cho bạn để có thể đăng nhập. Bấm "OK" để chuyển đến trang đăng nhập.');
        if (confirmation) {
          this.router.navigate(['/']);
        }
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {        
        debugger  
        alert(error?.error?.message ?? '')          
      }
  })
  }
  checkPasswordsMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword'].setErrors({ 'passwordMismatch': true });
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }
}