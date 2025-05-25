import { Component } from '@angular/core';
import { Student } from '../../../models/student';
import { Company } from '../../../models/company';
import { Mentor } from '../../../models/mentor';
import { Lecturer } from '../../../models/lecturer';
import { User } from '../../../models/user';
import { StudentService } from '../../../services/student.service';
import { CompanyService } from '../../../services/company.service';
import { MentorService } from '../../../services/mentor.service';
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

  searchTerm: string = '';
  errorMessage: string = '';

  constructor(private studentService : StudentService, 
    private companyService : CompanyService,
    private mentorService : MentorService, 
    private lecturerService : LecturerService, 
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.getAllCompanies();
    this.getAllMentors();
    this.getAllLecturers();
  }

  getAllCompanies(){
    this.companyService.getAllCompanies().subscribe({
      next: (data) => {
        this.companyList = data; 
      },
      error: (err) => {
        console.error('Lỗi lấy danh sách công ty:', err);
      }
    });
  }

  getAllLecturers(){
    this.lecturerService.getAllLecturers().subscribe({
      next: (data) => {
        this.lecturerList = data; 
      },
      error: (err) => {
        console.error('Lỗi lấy danh sách giảng viên:', err);
      }
    });
  }

  getAllMentors(){
    this.mentorService.getAllMentors().subscribe({
      next: (data) => {
        this.mentorList = data; 
      },
      error: (err) => {
        console.error('Lỗi lấy danh sách mentor:', err);
      }
    });
  }

  //Tạo thông tin thực tập
  createInternship() {
    const userId = Number(localStorage.getItem('user_id'));
  
    const val: any = {
      student_code: this.student_code,
      student_name: this.student_name,
      class_student: this.class_student,
      major: this.major,
      year_of_study: this.year_of_study,
      company_id: this.company_id,
      mentor_id: this.mentor_id,
      lecturer_id: this.lecturer_id,
      start_date: this.start_date,
      end_date: this.end_date,
      language: this.language,
      position: this.position,
      user_id: userId, 
      status: this.status      
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

  searchCompany(): void {
    const trimmedName = this.searchTerm.trim();
    if (!trimmedName) {
      this.getAllCompanies();
      return;
    }
  
    // Nếu có tên cần tìm
    this.companyService.searchCompaniesByName(trimmedName).subscribe({
      next: (data) => {
        this.companyList = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Không tìm thấy công ty';
        this.companyList = [];
      }
    });
  }

  searchMentor(): void {
    const trimmedName = this.searchTerm.trim();
    if (!trimmedName) {
      this.getAllMentors();
      return;
    }
  
    // Nếu có tên cần tìm
    this.mentorService.searchMentorsByName(trimmedName).subscribe({
      next: (data) => {
        this.mentorList = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Không tìm thấy công ty';
        this.mentorList = [];
      }
    });
  }

  searchLecturer(): void {
    const trimmedName = this.searchTerm.trim();
    if (!trimmedName) {
      this.getAllLecturers();
      return;
    }
  
    // Nếu có tên cần tìm
    this.lecturerService.searchLecturersByName(trimmedName).subscribe({
      next: (data) => {
        this.lecturerList = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Không tìm thấy công ty';
        this.lecturerList = [];
      }
    });
  }
}
