import { Component } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { Lecturer } from '../../../models/lecturer';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Student } from '../../../models/student';
import { LecturerService } from '../../../services/lecturer.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-student.information-lecturer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.information-lecturer.component.html',
  styleUrl: './student.information-lecturer.component.css'
})
export class StudentInformationLecturerComponent {
  student : Student;
  lecturer : Lecturer;
  user : User;

  constructor(
     private studentService : StudentService,
     private lecturerService : LecturerService,
     private userService : UserService
    ) {}

  ngOnInit(): void {
    this.getLecturerInfo();
  }

  getLecturerInfo(): void {
    const userId = Number(localStorage.getItem('user_id'));
    this.studentService.getStudentById(userId).subscribe({
      next: (data) => {
        this.student = data; 

        this.lecturerService.getLecturerById(this.student.lecturer_id).subscribe({
          next: (data) => {
            this.lecturer = data;

            this.userService.getUserById(this.lecturer.user_id).subscribe({
              next: (data) => {
                this.user = data; 
              },
              error: (err) => {
                console.error('Lỗi lấy người dùng:', err);
              }
            });
          },
          error: (err) => {
            console.error('Lỗi lấy giảng viên:', err);
          }
        });
      },
      error: (err) => {
        console.error('Lỗi lấy người dùng:', err);
      }
    });
  }
}
