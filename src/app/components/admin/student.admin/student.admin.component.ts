import { Component, Inject, Input } from '@angular/core';
import { Student } from '../../../models/student';
import { environment } from '../../../environments/environment';
import { StudentService } from '../../../services/student.service';
import { Router } from '@angular/router';
import { CommonModule, DOCUMENT, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentAdminUpdateCreateComponent } from './student.admin.update.create/student.admin.update.create.component';
import { UserAdminUpdateAccountComponent } from '../user.admin/user.admin.update-account/user.admin.update-account.component';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-student.admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StudentAdminUpdateCreateComponent,
    UserAdminUpdateAccountComponent
],
  templateUrl: './student.admin.component.html',
  styleUrl: './student.admin.component.css'
})
export class StudentAdminComponent  {
  students: Student[] = [];
  @Input() student : Student;
  currentPage: number = 0;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  keyword:string = "";
  visiblePages: number[] = [];
  localStorage?: Storage;
  apiBaseUrl = environment.apiBaseUrl;
  dangThemSua = true;
  userId: number;
  selectedUserId: number;
  constructor(
    private studentService: StudentService,
    private userService : UserService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }
  ngOnInit(): void {
    debugger
    this.currentPage = Number(this.localStorage?.getItem('currentStudentPage')) || 0; 
    this.getStudents(this.keyword, this.currentPage, this.itemsPerPage);
  }
  searchStudents() {
    this.currentPage = 0;
    this.itemsPerPage = 3;
    this.getStudents(this.keyword, this.currentPage, this.itemsPerPage);
  }
  getStudents(keyword: string, page: number, limit: number) {
    debugger
    this.studentService.getStudents(keyword, page, limit).subscribe({
      next: (response: any) => {
        debugger
        this.students = response.students;
        console.log(this.students);
        this.totalPages = response.totalPages;
        debugger
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
      },
      error: (error: any) => {

        console.error('Error fetching students:', error);
      }
    });
  }

  onPageChange(page: number) {
    debugger;
    this.currentPage = page < 0 ? 0 : page;
    this.localStorage?.setItem('currentStudentPage', String(this.currentPage)); 
    this.getStudents(this.keyword, this.currentPage, this.itemsPerPage);
  }
  
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    debugger
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  
    debugger
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
  
    debugger
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
  
    debugger
    return new Array(endPage - startPage + 1).fill(0)
      .map((_, index) => startPage + index);
  }
  
  searchStudent() {
    this.currentPage = 0;
    this.itemsPerPage = 3;
    debugger;
    this.getStudents(this.keyword, this.currentPage,  this.itemsPerPage);
  }
  
  // Hàm xử lý sự kiện khi sản phẩm được bấm vào
  onStudentClick(studentCode: number) {
    debugger;
    // Điều hướng đến trang detail-student với studentId là tham số
    this.router.navigate(['admin/students', studentCode]);
  }
  navigateAdminComponent(componentName: string): void {
    if (componentName === 'students') {
      this.router.navigate(['/admin/students']);
    } else if (componentName === 'companies') {
      this.router.navigate(['/admin/companies']);
    } else if (componentName === 'supervisors') {
      this.router.navigate(['/admin/supervisors']);
    } else if (componentName === 'company-supervisors') {
      this.router.navigate(['/admin/company-supervisors']);
    }
  }
  addStudent(){
    this.student = 
    {
      student_code: 0,
      student_name: '',
      class_student: '',
      major: '',
      year_of_study: 0,
      company_id: 0,
      mentor_id: 0,
      leturer_id: 0,
      start_date: new Date(),
      end_date: new Date(),
      language: '',
      position: '',
      user_id: 0,
      student_status: '',
    }
    this.dangThemSua = true;
  }
  updateStudent(student: Student){
    debugger
    this.student = student;
    this.dangThemSua = true;
  }
  dong(){
    this.dangThemSua = false;
    this.getStudents(this.keyword, this.currentPage, this.itemsPerPage);
  }
  updateUser(student: Student){
    this.student = student;
    this.dangThemSua = true;
  }
  
  deleteUser(id: number) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      this.userService.deleteUser(id).subscribe({
        next: (response: any) => {
          alert("Xóa tài khoản sinh viên thành công.");
          this.getStudents(this.keyword, this.currentPage, this.itemsPerPage);
        },
        error: (error: any) => {
          console.error(error);
          alert("Xóa tài khoản sinh viên thất bại.");
        },
        complete: () => {
          // Có thể thêm logic hoàn tất tại đây nếu cần
        }
      });
    } else {
      alert("Hủy xóa tài khoản sinh viên.");
    }
  }
  
}

