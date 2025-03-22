import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentResponse } from '../../../../responses/student/student.response';
import { Role } from '../../../../models/role';

@Component({
  selector: 'app-student.admin.detail',
  standalone: true,
  imports: [],
  templateUrl: './student.admin.detail.component.html',
  styleUrl: './student.admin.detail.component.css'
})
export class StudentAdminDetailComponent implements OnInit {
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
  private studentService = inject(StudentService);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudentDetails();
  }

  getStudentDetails(): void {
    debugger;
    const studentCode = Number(this.route.snapshot.paramMap.get('studentCode'));
  
    this.studentService.getDetailStudent(studentCode).subscribe({
      next: (response: any) => {
        debugger;
  
        const data = response.data;
        console.log(data);
  
        // Gán các giá trị cho `studentResponse`
        this.studentResponse = {
          ...this.studentResponse, // Giữ các giá trị mặc định
          student_code: data.student_code,
          student_name: data.student_name,
          class_student: data.class_student,
          major: data.major,
          year_of_study: data.year_of_study,
          company_name: data.company_name,
          company_supervisor_name: data.company_supervisor_id,
          supervisor_name: data.supervisor_name,
          start_date: data.start_date
            ? new Date(data.start_date[0], data.start_date[1] - 1, data.start_date[2])
            : this.studentResponse.start_date,
          end_date: data.end_date
            ? new Date(data.end_date[0], data.end_date[1] - 1, data.end_date[2])
            : this.studentResponse.end_date,
          language: data.language,
          position: data.position,
          student_status: data.student_status,
          user_response: {
            ...this.studentResponse.user_response, // Giữ các giá trị mặc định
            user_id: data.user_response.user_id,
            full_name: data.user_response.full_name,
            email: data.user_response.email,
            phone_number: data.user_response.phone_number,
            gender: data.user_response.gender,
            date_of_birth: new Date(data.user_response.date_of_birth),
            desired_role: data.user_response.desired_role,
            is_active: data.user_response.is_active,
            role: data.user_response.role,
          },
        };
        console.log(this.studentResponse.student_code);
      },
      complete: () => {
        debugger;
        console.log('Student details fetched successfully.');
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching student details:', error);
      },
    });
  }  
}