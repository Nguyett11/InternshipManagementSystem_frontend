import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LecturerService } from '../../services/lecturer.service';
import { Lecturer } from '../../models/lecturer';

@Component({
  selector: 'app-lecturer',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './lecturer.component.html',
  styleUrl: './lecturer.component.css'
})
export class LecturerComponent {
  
  lecturer : Lecturer;

  constructor(private router: Router, private userService : UserService,
    private lecturerService : LecturerService
   ) {}
  
  ngOnInit(): void {
    const userId = Number(localStorage.getItem('user_id'));

    this.getLecturerById(userId);
  }

  getLecturerById(userId: number): void {
    this.lecturerService.getLecturerByUserId(userId).subscribe({
      next: (data) => {
        this.lecturer = data; 
      },
      error: (err) => {
        console.error('Lỗi lấy người dùng:', err);
      }
    });
  }

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
