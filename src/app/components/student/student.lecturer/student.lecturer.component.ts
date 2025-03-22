import { Component } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { Lecturer } from '../../../models/lecturer';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-student.lecturer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.lecturer.component.html',
  styleUrl: './student.lecturer.component.css'
})
export class StudentLecturerComponent {
  user : User;
  lecturer : Lecturer;
  response : any;

  constructor(
     private studentService : StudentService
    ) {}

  ngOnInit(): void {
    this.getLectures();
  }

  //lấy lecturer
  getLectures(){
    this.studentService.getDetailLecturerByToken().subscribe({
      next: (response: any) => {
        console.log("lecturer",response);
        this.user = response.data;
        this.lecturer = response.data;
      },
      complete: () => {
      },
      error: (error: any) => {

        console.error('Error fetching students:', error);
      }
    });
  }
}
