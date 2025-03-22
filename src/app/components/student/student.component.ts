import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    CommonModule,
        RouterModule
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

  constructor(private router: Router, private userService : UserService ) {}

  ngOnInit(): void {}

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        console.log('Logout successful.');
        this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }
}