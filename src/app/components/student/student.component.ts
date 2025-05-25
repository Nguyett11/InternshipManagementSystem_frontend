import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';

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

  student : Student;

  constructor(private router: Router, private userService : UserService,
    private studentService : StudentService
   ) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('user_id'));

    this.getStudentById(userId);
  }

  getStudentById(userId: number): void {
    this.studentService.getStudentById(userId).subscribe({
      next: (data) => {
        this.student = data; 
      },
      error: (err) => {
        console.error('Lỗi lấy người dùng:', err);
      }
    });
  }

  logout(event: Event): void {
    event.preventDefault();
    this.userService.logout().subscribe({
      next: () => {
        console.log('Logout successful.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }
  
}