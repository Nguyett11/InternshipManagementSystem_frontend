import { Component, Input } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../models/student';
import { CompanyService } from '../../../../services/company.service';
import { Company } from '../../../../models/company';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MentorService } from '../../../../services/mentorService';
import { Mentor } from '../../../../models/mentor';
import { Lecturer } from '../../../../models/lecturer';
import { LecturerService } from '../../../../services/lecturer.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-student-admin-update-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.admin.update.create.component.html',
  styleUrl: './student.admin.update.create.component.css'
})
export class StudentAdminUpdateCreateComponent {
  student_code: number;
  student_name : string;
  class_student : string;
  major : string;
  year_of_study: number;
  company_id: number;
  mentor_id: number;
  lecturer_id: number;
  start_date: Date;
  end_date: Date;
  language: string;
  position: string;
  user_id: number;
  status: string = "In Progress";
  @Input() student : Student;
  totalPages: number = 0;
  keyword:string = "";
  visiblePages: number[] = [];
  companyList: Company[];
  currentPage : number = 0;
  mentorList: Mentor[];
  lecturerList: Lecturer[];
  userList: User [];

  constructor(private studentService : StudentService, private companyService : CompanyService,
    private mentorService : MentorService, private lecturerService : LecturerService, private userService : UserService
  ) { }

  ngOnInit(): void {
    if (this.student) {
      this.student_code = this.student.student_code;
      this.student_name = this.student.student_name;
      this.class_student = this.student.class_student;
      this.major = this.student.major;
      this.year_of_study = this.student.year_of_study;
      this.company_id = this.student.company_id;
      this.mentor_id = this.student.mentor_id;
      this.lecturer_id = this.student.leturer_id;
  
      /// Nếu start_date và end_date là kiểu Date, chỉ cần gán trực tiếp
      this.start_date = this.student.start_date ? new Date(this.student.start_date) : new Date();
      this.end_date = this.student.end_date ? new Date(this.student.end_date) : new Date();

      this.language = this.student.language;
      this.position = this.student.position;
      this.status = this.student.student_status;
    }

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

  //Tạo sinh viên
  createStudent() {
    var val = {
      student_code : this.student_code,
      student_name : this.student_name,
      class_student : this.class_student,
      major: this.major,
      year_of_study: this.year_of_study,
      company_id: this.company_id,
      mentor_id: this.mentor_id,
      lecturer_id: this.lecturer_id,
      start_date: this.start_date,
      end_date: this.end_date,
      user_id : this.user_id,
      status : this.status,
      language : this.language,
      position : this.position
    }
    this.studentService.insertStudent(val).subscribe({  
      next: (response: any) => {
        alert("Thêm thông tin thực tập sinh viên thành công.");
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log(error);
        alert("Thêm thông tin thực tập sinh viên thất bại");
      }
    });
  }

  //Cập nhật sinh viên
  updateStudent(student: Student){
    var val = {
      student_code : this.student_code,
      student_name : this.student_name,
      class_student : this.class_student,
      major: this.major,
      year_of_study: this.year_of_study,
      company_id: this.company_id,
      mentor_id: this.mentor_id,
      lecturer_id: this.lecturer_id,
      start_date: this.start_date,
      end_date: this.end_date, 
      status : this.status,
      language : this.language,
      position : this.position
    }
    this.studentService.updateStudent(student.student_code, val).subscribe({
      next: (response: any) => {
        alert("Cập nhật thông tin thực tập sinh viên thành công.");
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log(error);
        alert("Cập nhật thông tin thực tập sinh viên thất bại.");
      }
    });
  }
}
