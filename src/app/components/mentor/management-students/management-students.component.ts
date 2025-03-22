import { Component } from '@angular/core';
import { Role } from '../../../models/role';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReportService } from '../../../services/report.service';
import { StudentService } from '../../../services/student.service';
import { StudentResponse } from '../../../responses/student/student.response';
import { Student } from '../../../models/student';
import { ButtonProfileComponent } from '../../button-profile/button-profile.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-students',
  standalone: true,
  imports: [ FormsModule, CommonModule, FormsModule,
        CommonModule,
        RouterModule],
  templateUrl: './management-students.component.html',
  styleUrl: './management-students.component.css'
})
export class ManagementStudentsComponent {
title: string;
  description: string;
  dueDate: Date;
  listStudents: Student[];
  selectedStudents: boolean[] = []; 

  students: StudentResponse[] = [];
  keyword: string = "";

  studentResponse: StudentResponse = {
    student_code: 0,
    student_name: '',
    class_student: '',
    major: '',
    year_of_study: 0,
    company_name: '',
    company_supervisor_name: '',
    supervisor_name: '',
    start_date: new Date(),
    end_date: new Date(),
    language: '',
    position: '',
    student_status: '',
    user_response: {
      user_id: 0,
      full_name: '',
      email: '',
      phone_number: '',
      gender: '', // Đúng cú pháp, dấu '=' đổi thành ':'
      date_of_birth: new Date(), // Đúng cú pháp
      desired_role: '', // Bổ sung giá trị mặc định
      is_active: false, // Bổ sung giá trị mặc định
      role: {} as Role, // Cần khởi tạo với giá trị hợp lệ hoặc ép kiểu
    },
    };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private studentService: StudentService
  ) {
    this.title = '';
    this.description = '';
    this.dueDate = new Date();
    this.listStudents = [];
  }

  ngOnInit(): void {
    this.getStudentsByMentor(this.keyword);
  }

  // Hàm xử lý sự kiện khi sản phẩm được bấm vào
  onMentorClick(studentCode: number) {
    debugger;
    // Điều hướng đến trang detail-student với studentId là tham số
    this.router.navigate(['mentors/submissionByStudent', studentCode]);
  }

  getStudentsByMentor(keyword: string) {
    console.log('Keyword:', keyword);
    this.studentService.getStudentsByMentor(keyword).subscribe({
      next: (response: any) => {
        debugger;
        const data = response.data;
        console.log('Students:', data);
  
        // Cập nhật danh sách sinh viên
        this.students = data.map((student: any) => ({
          student_code: student.student_code,
          student_name: student.student_name,
          class_student: student.class_student,
          major: student.major,
          year_of_study: student.year_of_study,
          company_name: student.company_name,
          company_supervisor_name: student.company_supervisor_id,
          supervisor_name: student.supervisor_name,
          start_date: student.start_date
            ? new Date(student.start_date[0], student.start_date[1] - 1, student.start_date[2])
            : null,
          end_date: student.end_date
            ? new Date(student.end_date[0], student.end_date[1] - 1, student.end_date[2])
            : null,
          language: student.language,
          position: student.position,
          student_status: student.student_status || 'inactive',
          user_response: {
            email: student.user_response?.email || 'Không có',
            phone_number: student.user_response?.phone_number || 'Không có',
          },
        }));
        // Kiểm tra nội dung của biến students
  console.log('Updated students:', this.students);
      },
      error: (error: any) => {
        console.error('Error fetching students:', error);
      },
    });
  }
}
