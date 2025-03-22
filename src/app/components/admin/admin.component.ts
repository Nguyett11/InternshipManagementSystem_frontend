import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserResponse } from '../../responses/user/user.response';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
//import { ButtonProfileComponent } from "../button-profile/button-profile.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // ButtonProfileComponent
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  userResponse?: UserResponse | null;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {

  }

  navigateAdminComponent(componentName: string): void {
    if (componentName === 'home') {
      this.router.navigate(['/admin/home']);
    } else if (componentName === 'students') {
      this.router.navigate(['/admin/students']);
    } else if (componentName === 'companies') {
      this.router.navigate(['/admin/companies']);
    } else if (componentName === 'lecturers') {
      this.router.navigate(['/admin/lecturers']);
    } else if (componentName === 'mentors') {
      this.router.navigate(['/admin/mentors']);
    } else if (componentName === 'users') {
      this.router.navigate(['/admin/users']);
    }
  }
}
