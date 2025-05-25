import { Component } from '@angular/core';
import { Student } from '../../../models/student';
import { StudentService } from '../../../services/student.service';
import { LecturerService } from '../../../services/lecturer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecturer.student-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './lecturer.student-list.component.html',
  styleUrl: './lecturer.student-list.component.css'
})
export class LecturerStudentListComponent {
  
    studentList : Student[];
    searchTerm: string = '';
    errorMessage: string = '';
    lecturer_id : number;

  constructor( private studentService : StudentService,
    private lecturerService : LecturerService,
    private router: Router
    ) { }
  
    ngOnInit(): void {
      const userId = Number(localStorage.getItem('user_id')); 
  
      this.loadStudents(userId);
    }
  
    loadStudents(userId : number): void {
      this.lecturerService.getLecturerByUserId(userId).subscribe({
        next: (data) => {
          console.log(data);
          this.studentService.getStudentsByLecturerId(data.lecturer_id).subscribe({
            next: (data) => {
              this.studentList = data;
              console.log(this.studentList);  
              this.errorMessage = '';
            },
            error: (err) => {
              this.studentList = [];
              this.errorMessage = err.error.message || 'Lỗi khi tải danh sách sinh viên.';
            },
          });      
        },
        error: (err) => {
          console.error('Lỗi lấy giảng viên:', err);
        }
      });
    }

    search(): void {
      const trimmedName = this.searchTerm.trim();
      if (!trimmedName) {
        const userId = Number(localStorage.getItem('user_id')); 
        this.loadStudents(userId);
        return;
      }
    
      // Nếu có tên cần tìm
      this.studentService.searchStudentsByName(trimmedName).subscribe({
        next: (data) => {
          this.studentList = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Không tìm thấy sinh viên';
          this.studentList = [];
        }
      });
    }

    xemChiTiet(event: Event, user_id : number): void {
      event.preventDefault();
      this.router.navigate([`lecturer/information-student/${user_id}`]);
    }
}
