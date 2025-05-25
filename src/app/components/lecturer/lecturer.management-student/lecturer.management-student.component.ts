import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../../services/report.service';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student';
import { StudentResponse } from '../../../responses/student/student.response';
import { Role } from '../../../models/role';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { InsertReportDTO } from '../../../dtos/report/insert.report.dto';

@Component({
  selector: 'app-management-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lecturer.management-student.component.html',
  styleUrl: './lecturer.management-student.component.css'
})
export class LecturerManagementStudentComponent implements OnInit {
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
    mentor_name: '',
    lecturer_name: '',
    start_date: new Date(),
    end_date: new Date(),
    language: '',
    position: '',
    student_status: '',
    user_response: {
      user_id: 0,
      full_name: '',
      profile_image: '',
      email: '',
      phone_number: '',
      gender: '', // Đúng cú pháp, dấu '=' đổi thành ':'
      date_of_birth: new Date(), // Đúng cú pháp
      desired_role: '', // Bổ sung giá trị mặc định
      is_active: false, // Bổ sung giá trị mặc định
      role_id:0
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
    this.getStudentsByLecturer(this.keyword);
  }

  getStudentsByLecturer(keyword: string) {
    console.log('Keyword:', keyword);
    this.studentService.getStudentsByLecturer(keyword).subscribe({
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
          mentor_name: student.mentor_name,
          lecturer_name: student.lecturer_name,
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
