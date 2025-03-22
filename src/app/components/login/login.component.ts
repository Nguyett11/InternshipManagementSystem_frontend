import {
  Component, OnInit, ViewChild 
} from '@angular/core';
import { 
  FormsModule, NgForm 
} from '@angular/forms';
import {
  NgClass, NgFor 
} from '@angular/common';
import { UserResponse } from '../../responses/user/user.response';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { LoginDTO } from '../../dtos/user/login.dto';
import { LoginResponse } from '../../responses/user/login.response';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;

  email: string = 'student@gmail.com';
  password: string = '11062003cong';
  user_id : number;

  roles: Role[] = []; // Mảng roles
  userResponse?: UserResponse

  onEmailChange() {
    console.log(`Email typed: ${this.email}`);
    // how to validate ?
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  createAccount() {
    debugger;
    // Chuyển hướng người dùng đến trang đăng ký (hoặc trang tạo tài khoản)
    this.router.navigate(['/register']); 
  }

  login() {
    const message = `email: ${this.email}` +
      `password: ${this.password}`;
    debugger;
    const loginDTO: LoginDTO = {
      email: this.email,
      password: this.password,
      user_id : this.user_id
    };
    debugger
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger
        const { token } = response;
        this.tokenService.setToken(token);
        //console.group(response.user_id);
        // Lưu user_id vào dịch vụ
        this.userService.setUserId(response.user_id);
        // Lưu user_id vào localStorage (nếu cần)
        localStorage.setItem('user_id', response.user_id.toString());
         // In user_id ra console
      console.log(`Logged in user_id: ${response.user_id}`);
       
        debugger
        this.userService.getUserDetail(token).subscribe({ // Lấy thông tin người dùng
          next: (response: any) => {
            debugger
            this.userResponse = {
              ...response,
              date_of_birth: new Date(response.date_of_birth),
            };
            debugger;
            this.userService.saveUserResponseToLocalStorage(this.userResponse);
            debugger;
            const roleName = this.userResponse?.role?.name;
            if (roleName === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else if (roleName === 'STUDENT') {
              this.router.navigate(['/student']);
            } else if (roleName === 'LECTURER') {
              this.router.navigate(['/lecturer']);
            } else if (roleName === 'MENTOR') {
              this.router.navigate(['/mentor']);
            } else {
              alert('Unauthorized role');
            } 
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
            alert(error.error.message);
          }
        }); 
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    });
  }
}
