import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Student } from '../../../models/student';
import { StudentService } from '../../../services/student.service';
import { CompanyService } from '../../../services/company.service';
import { MentorService } from '../../../services/mentor.service';
import { LecturerService } from '../../../services/lecturer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lecturer.information-student',
  imports: [CommonModule],
  templateUrl: './lecturer.information-student.component.html',
  styleUrl: './lecturer.information-student.component.css'
})
export class LecturerInformationStudentComponent {

  user : User;
  student : Student;
  company_name : string;
  lecturer_name : string;
  mentor_name : string;
  user_id : number;

  constructor(
    private userService : UserService,
    private studentService : StudentService,
    private companyService : CompanyService,
    private mentorService : MentorService,
    private lecturerService : LecturerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user_id = Number(this.route.snapshot.paramMap.get('user_id'));
    console.log("user_id: ", this.user_id);

    this.getUser(this.user_id);
    this.getStudentById(this.user_id);
  }
  
  getUser(userId: number){
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data; 
        //console.log(data);
      },
      error: (err) => {
        console.error('Lỗi lấy người dùng:', err);
      }
    });
  }

  getStudentById(userId: number): void {
    this.studentService.getStudentById(userId).subscribe({
      next: (data) => {
        this.student = data; 
        console.log("student: ", this.student);

        this.companyService.getCompanyById(this.student.company_id).subscribe({
          next: (data) => {
            this.company_name = data.company_name; 
            console.log("kkk: ",this.company_name);
          },
          error: (err) => {
            console.error('Lỗi lấy công ty:', err);
          }
        });

        this.mentorService.getMentorById(this.student.mentor_id).subscribe({
          next: (data) => {
            this.mentor_name = data.mentor_name; 
          },
          error: (err) => {
            console.error('Lỗi lấy mentor:', err);
          }
        });

        this.lecturerService.getLecturerById(this.student.lecturer_id).subscribe({
          next: (data) => {
            this.lecturer_name = data.lecturer_name; 
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
