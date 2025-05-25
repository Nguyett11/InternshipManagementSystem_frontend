import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { Lecturer } from '../../../models/lecturer';
import { StudentService } from '../../../services/student.service';
import { Mentor } from '../../../models/mentor';
import { Student } from '../../../models/student';
import { MentorService } from '../../../services/mentor.service';
import { UserService } from '../../../services/user.service';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-student.information-mentor',
  standalone: true,
  imports: [],
  templateUrl: './student.information-mentor.component.html',
  styleUrl: './student.information-mentor.component.css'
})
export class StudentInformationMentorComponent {
  user : User;
  mentor : Mentor;
  student : Student;
  company_name : string;

  constructor(
     private studentService : StudentService,
     private mentorService : MentorService,
     private userService : UserService,
     private companyService : CompanyService
    ) {}

  ngOnInit(): void {
    this.getMentorInfo();
  }

  getMentorInfo(): void {
    const userId = Number(localStorage.getItem('user_id'));
    this.studentService.getStudentById(userId).subscribe({
      next: (data) => {
        this.student = data; 

        this.mentorService.getMentorById(this.student.mentor_id).subscribe({
          next: (data) => {
            this.mentor = data;

            this.userService.getUserById(this.mentor.user_id).subscribe({
              next: (data) => {
                this.user = data; 
              },
              error: (err) => {
                console.error('Lỗi lấy người dùng:', err);
              }
            });

            this.companyService.getCompanyById(this.mentor.company_id).subscribe({
              next: (data) => {
                this.company_name = data.company_name; 
              },
              error: (err) => {
                console.error('Lỗi lấy người dùng:', err);
              }
            });
          },
          error: (err) => {
            console.error('Lỗi lấy mentor:', err);
          }
        });
      },
      error: (err) => {
        console.error('Lỗi lấy người dùng:', err);
      }
    });
  }
}
