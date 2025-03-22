import { Component } from '@angular/core';
import { Student } from '../../../models/student';
import { Company } from '../../../models/company';
import { Mentor } from '../../../models/mentor';
import { Lecturer } from '../../../models/lecturer';
import { User } from '../../../models/user';
import { StudentService } from '../../../services/student.service';
import { CompanyService } from '../../../services/company.service';
import { MentorService } from '../../../services/mentorService';
import { LecturerService } from '../../../services/lecturer.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-student.create.internship',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.create.internship.component.html',
  styleUrl: './student.create.internship.component.css'
})
export class StudentCreateInternshipComponent {
  student_code : number;
  student_name : string;
  class_student : string;
  major: string;
  year_of_study: number;
  company_id: number;
  mentor_id: number;
  lecturer_id: number = 0;
  start_date: Date;
  end_date: Date;
  language: string;
  position: string;
  user_id : number;
  status: string = "In Progress";
  student : Student;
  keyword:string = "";
  companyList : Company[];
  currentPage: number = 0;
  mentorList: Mentor[];
  lecturerList: Lecturer[];
  userList : User[];

  constructor(private studentService : StudentService, private companyService : CompanyService,
    private mentorService : MentorService, private lecturerService : LecturerService, private userService : UserService
  ) { }

  ngOnInit(): void {
    this.getCompanies(this.keyword, this.currentPage, 5);
    this.getMentors(this.keyword, this.currentPage, 5);
    this.getLectures(this.keyword, this.currentPage, 5);
    this.getUsers(this.keyword, this.currentPage, 100);
  }

  //Lấy danh sách công ty
  getCompanies(keyword: string, page: number, limit: number){
    this.companyService.getCompanies(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.companyList = response.companies;
      },
      complete: () => {
      },
      error: (error: any) => {

        console.error('Error fetching students:', error);
      }
    });
  }
  
  //lấy danh sách mentor
  getMentors(keyword: string, page: number, limit: number){
    this.mentorService.getMentors(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.mentorList = response.mentors;
      },
      complete: () => {
      },
      error: (error: any) => {

        console.error('Error fetching students:', error);
      }
    });
  }

  //lấy danh sách lecturer
  getLectures(keyword: string, page: number, limit: number){
    this.lecturerService.getLectures(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.lecturerList = response.lecturers;
        console.log("lll",this.lecturerList);
      },
      complete: () => {
      },
      error: (error: any) => {

        console.error('Error fetching students:', error);
      }
    });
  }

  //lấy danh sách user
  getUsers(keyword: string, page: number, limit: number){
    this.userService.getUsers(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.userList = response.users;
      },
      complete: () => {
      },
      error: (error: any) => {

        console.error('Error fetching students:', error);
      }
    });
  }

  //Tạo thông tin thực tập
  createInternship() {
    const userId = this.userService.getUserId(); // Lấy user_id từ dịch vụ
  
    const val: any = {
      student_code: this.student_code,
      student_name: this.student_name,
      class_student: this.class_student,
      major: this.major,
      year_of_study: this.year_of_study,
      company_id: this.company_id,
      mentor_id: this.mentor_id,
      start_date: this.start_date,
      end_date: this.end_date,
      user_id: userId, // Sử dụng userId đã lấy từ dịch vụ
      status: this.status,
      language: this.language,
      position: this.position,
      lecturer_id: this.lecturer_id || 1 // Sử dụng lecturer_id với giá trị mặc định là 1
    };
  
    console.log('Dữ liệu gửi đi:', val); // Kiểm tra dữ liệu trước khi gửi
  
    this.studentService.insertStudent(val).subscribe({
      next: (response: any) => {
        alert("Thêm thông tin thực tập sinh viên thành công.");
      },
      error: (error: any) => {
        console.error('Lỗi khi gửi dữ liệu:', error); // Log lỗi để xem chi tiết
        alert("Thêm thông tin thực tập sinh viên thất bại");
      }
    });
  }
}
