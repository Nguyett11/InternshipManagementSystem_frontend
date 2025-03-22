import { Component, inject } from '@angular/core';
import { StudentResponse } from '../../../responses/student/student.response';
import { Role } from '../../../models/role';
import { StudentService } from '../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../../models/student';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,
        FormsModule],
  templateUrl: './student.detail.component.html',
  styleUrl: './student.detail.component.css'
})
export class StudentDetailComponent {
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
  student : StudentResponse;
  dangThemSua : boolean;
  tieude : string;
  userForm: FormGroup;
  user_id : number;
  private studentService = inject(StudentService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, 
    private userService : UserService
  ) {
     // Khởi tạo form
     this.userForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      desired_role: [''],
      gender: [''],
      // Thêm các trường khác nếu cần
    });
  }

  ngOnInit(): void {
    this.getStudentDetails();
  }

  getStudentDetails(): void {  
    this.studentService.getDetailStudentByToken().subscribe({
      next: (response: any) => {
        debugger;
  
        const data = response.data;
  
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
          student_status: response.status,
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

  updateStudent(student: StudentResponse) {
    this.student = student;
    this.dangThemSua = true;
    this.tieude = "Sửa thông tin";
    this.setUserForm(student.user_response); // Gọi hàm để thiết lập form
  }
  
    // Hàm để thiết lập giá trị cho form khi mở modal
    setUserForm(userResponse: any) {
      // console.log('User response:', userResponse);
      this.userForm.patchValue({
        full_name: userResponse.full_name,
        email: userResponse.email,
        phone_number: userResponse.phone_number,
        date_of_birth: userResponse.date_of_birth,
        desired_role: userResponse.desired_role,
        gender: userResponse.gender
      });
    }
  
    // Hàm gọi khi modal đóng
    dong() {
      this.dangThemSua = false;
      this.getStudentDetails();
      this.userForm.reset(); // Reset form khi đóng modal
    }
    submitUser() {
      this.user_id = Number(localStorage.getItem('user_id'));
      console.log(this.user_id);
      const is_active = 1; 
    
      const val = {
        full_name: this.userForm.get('full_name')?.value,
        email: this.userForm.get('email')?.value,
        phone_number: this.userForm.get('phone_number')?.value, 
        gender: this.userForm.get('gender')?.value, 
        date_of_birth: this.userForm.get('date_of_birth')?.value, 
        desired_role: this.userForm.get('desired_role')?.value, 
        // user_id: userId, 
        // is_active: is_active, 
      };

      console.log(val);
    
      this.userService.updateUser(this.user_id, val).subscribe({
        next: (response: any) => {
          alert("Cập nhật thông tin tài khoản sinh viên thành công.");
        },
        complete: () => {},
        error: (error: any) => {
          console.log(error);
          alert("Cập nhật thông tin tài khoản sinh viên thất bại.");
        }
      });
    }
    
}
