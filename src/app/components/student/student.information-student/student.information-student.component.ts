import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../../models/student';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company';
import { LecturerService } from '../../../services/lecturer.service';
import { Lecturer } from '../../../models/lecturer';
import { Mentor } from '../../../models/mentor';
import { MentorService } from '../../../services/mentor.service';

@Component({
  selector: 'app-student.information-student',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,
        FormsModule],
  templateUrl: './student.information-student.component.html',
  styleUrl: './student.information-student.component.css'
})
export class StudentInformationStudentComponent implements OnInit{
  //student : StudentResponse;
  dangThemSua : boolean;
  tieude : string;
  userForm: FormGroup;
  academicForm: FormGroup;
  user_id : number;
  user : User;
  student : Student;
  companies : Company[];
  lecturers : Lecturer[];
  mentors : Mentor[];
  company_name : string;
  mentor_name : string;
  lecturer_name : string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, 
    private userService : UserService,
    private studentService : StudentService,
    private companyService : CompanyService,
    private lecturerService : LecturerService,
    private mentorService : MentorService
  ) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('user_id'));
  
    this.userForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      date_of_birth: [''],
      desired_role: [''],
      gender: ['']
    });

    this.academicForm = this.fb.group({
      student_code: [''],
      class_student: [''],
      major: [''],
      year_of_study: [''],
      company_id: [''], // 👈 Đảm bảo có dòng này
      mentor_id: [''],
      lecturer_id: [''],
      start_date: [''],
      end_date: [''],
      language: [''],
      position: ['']
    });
    
    this.getUserById(userId);
    this.getStudentById(userId);
    this.getAllCompanies();
    this.getAllLecturers();
    this.getAllMentors();
  }
  

  getUserById(userId: number): void {
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data; 
        //console.log(data);
        this.setUserForm(this.user);
      },
      error: (err) => {
        console.error('Lỗi lấy người dùng:', err);
      }
    });
  }

  getStudentById(userId: number): void {
    this.studentService.getStudentById(userId).subscribe({
      next: (data) => {
        this.student = data; 
        //console.log(data);
        this.setAcademicForm(this.student);

        this.companyService.getCompanyById(this.student.company_id).subscribe({
          next: (data) => {
            this.company_name = data.company_name; 
          },
          error: (err) => {
            console.error('Lỗi lấy công ty:', err);
          }
        });

        this.mentorService.getMentorById(this.student.mentor_id).subscribe({
          next: (data) => {
            this.mentor_name = data.mentor_name; 
          },
          error: (err) => {
            console.error('Lỗi lấy mentor:', err);
          }
        });

        this.lecturerService.getLecturerById(this.student.lecturer_id).subscribe({
          next: (data) => {
            this.lecturer_name = data.lecturer_name; 
          },
          error: (err) => {
            console.error('Lỗi lấy giảng viên:', err);
          }
        });
      },
      error: (err) => {
        console.error('Lỗi lấy người dùng:', err);
      }
    });
  }

  getAllCompanies(){
    this.companyService.getAllCompanies().subscribe({
      next: (data) => {
        this.companies = data; 
        //console.log(this.companies);
      },
      error: (err) => {
        console.error('Lỗi lấy danh sách công ty:', err);
      }
    });
  }

  getAllLecturers(){
    this.lecturerService.getAllLecturers().subscribe({
      next: (data) => {
        this.lecturers = data; 
        //console.log(this.lecturers);
      },
      error: (err) => {
        console.error('Lỗi lấy danh sách giảng viên:', err);
      }
    });
  }

  getAllMentors(){
    this.mentorService.getAllMentors().subscribe({
      next: (data) => {
        this.mentors = data; 
        //console.log(this.mentors);
      },
      error: (err) => {
        console.error('Lỗi lấy danh sách mentor:', err);
      }
    });
  }

  showUpdateForm(formId: string): void {
    const element = document.getElementById(formId);
    if (element) {
      element.style.display = 'block';
    }
  }
  
  hideUpdateForm(formId: string): void {
    const element = document.getElementById(formId);
    if (element) {
      element.style.display = 'none';
    }
  }

  setUserForm(user: any): void {
    const dateOfBirth = user.date_of_birth ? user.date_of_birth.split('T')[0] : '';

    const validGenders = ['nam', 'nữ', 'khác'];
    const genderRaw = user.gender?.toLowerCase();
    const genderValue = validGenders.includes(genderRaw) ? genderRaw : 'khác';

    this.userForm.patchValue({
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      date_of_birth: dateOfBirth,
      desired_role: user.desired_role,
      gender: genderValue
    });
  }

  submitUser() {
    this.user_id = Number(localStorage.getItem('user_id'));
  
    const val = {
      user_id : this.user_id,
      full_name: this.userForm.get('full_name')?.value,
      email: this.userForm.get('email')?.value,
      phone_number: this.userForm.get('phone_number')?.value, 
      gender: this.userForm.get('gender')?.value, 
      date_of_birth: this.userForm.get('date_of_birth')?.value, 
      desired_role: this.user.desired_role,
      password : this.user.password,
      is_active : this.user.is_active,
      role_id : this.user.role_id 
    };

    console.log(val);
  
    this.userService.updateUser(this.user_id, val).subscribe({
      next: (response: any) => {
        alert("Cập nhật thông tin tài khoản sinh viên thành công.");
        const userId = Number(localStorage.getItem('user_id'));      
        this.getUserById(userId);
        this.getStudentById(userId);
      },
      complete: () => {},
      error: (error: any) => {
        console.log(error);
        alert("Cập nhật thông tin tài khoản sinh viên thất bại.");
      }
    });
  }

  setAcademicForm(student: any): void {
    const startDate = student.start_date ? student.start_date.split('T')[0] : '';
    const endDate = student.end_date ? student.end_date.split('T')[0] : '';
  
    this.academicForm.patchValue({
      student_code: student.student_code,
      class_student: student.class_student,
      major: student.major,
      year_of_study: student.year_of_study,
      company_id: student.company_id,
      mentor_id: student.mentor_id,
      lecturer_id: student.lecturer_id,
      start_date: startDate,
      end_date: endDate,
      language: student.language,
      position: student.position
    });
  }

  submitStudent(): void {
    this.user_id = Number(localStorage.getItem('user_id'));
  
    const studentVal = {
      student_code: this.academicForm.get('student_code')?.value,
      student_name : this.student.student_name,
      class_student: this.academicForm.get('class_student')?.value,
      major: this.academicForm.get('major')?.value,
      year_of_study: this.academicForm.get('year_of_study')?.value,
      company_id: this.academicForm.get('company_id')?.value,
      mentor_id: this.academicForm.get('mentor_id')?.value,
      lecturer_id: this.academicForm.get('lecturer_id')?.value,
      start_date: this.academicForm.get('start_date')?.value,
      end_date: this.academicForm.get('end_date')?.value,
      language: this.academicForm.get('language')?.value,
      position: this.academicForm.get('position')?.value,
      user_id: this.student.user_id,
      status : this.student.status
    };

    console.log(studentVal);
  
    this.studentService.updateStudent(this.user_id, studentVal).subscribe({
      next: () => {
        this.getStudentById(this.user_id);
        alert("Cập nhật thông tin học tập thành công.");
      },
      error: (err) => {
        console.error(err);
        alert("Cập nhật thông tin học tập thất bại.");
      }
    });
  }  
}
