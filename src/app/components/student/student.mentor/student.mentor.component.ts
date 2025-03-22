import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { Lecturer } from '../../../models/lecturer';
import { StudentService } from '../../../services/student.service';
import { Mentor } from '../../../models/mentor';

@Component({
  selector: 'app-student.mentor',
  standalone: true,
  imports: [],
  templateUrl: './student.mentor.component.html',
  styleUrl: './student.mentor.component.css'
})
export class StudentMentorComponent {
  user : User;
  mentor : Mentor;
  response : any;
  company_name : any;

  constructor(
     private studentService : StudentService
    ) {}

  ngOnInit(): void {
    this.getMentor();
  }

  //lấy lecturer
  getMentor(){
    this.studentService.getDetailMentorByToken().subscribe({
      next: (response: any) => {
        console.log("mentor",response);
        this.user = response.data;
        this.mentor = response.data;
        this.company_name = response.data.company_name;
        console.log(this.company_name);
      },
      complete: () => {
      },
      error: (error: any) => {

        console.error('Error fetching students:', error);
      }
    });
  }
}
