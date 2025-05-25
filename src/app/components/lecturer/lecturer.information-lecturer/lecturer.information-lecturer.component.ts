import { Component } from '@angular/core';
import { Lecturer } from '../../../models/lecturer';
import { LecturerService } from '../../../services/lecturer.service';
import { LecturerResponse } from '../../../responses/lecturer/lecturer.response';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-information-lecturer',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './lecturer.information-lecturer.component.html',
  styleUrl: './lecturer.information-lecturer.component.css'
})
export class LecturerInformationLecturerComponent {

  userForm: FormGroup;
  lecturerForm: FormGroup;
  user_id : number;
  lecturer_name : string;
  department : string;
  lecturer : Lecturer; 
  user : User;

  constructor(private lecturerService: LecturerService, private fb: FormBuilder, private userService : UserService) {
    this.userForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      desired_role: [''],
      gender: [''],
    });
    this.lecturerForm = this.fb.group({
      department: ['', Validators.required],
      lecturer_name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('user_id')); 
  
    this.getUserById(userId);
    this.getLecturerById(userId);
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
  
  getLecturerById(userId: number): void {
    this.lecturerService.getLecturerByUserId(userId).subscribe({
      next: (data) => {
        this.lecturer = data; 
        //console.log(data);
        this.setLecturerForm(this.lecturer);       
      },
      error: (err) => {
        console.error('Lỗi lấy giảng viên:', err);
      }
    });
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

  // Hàm để thiết lập giá trị cho form khi mở modal
  setLecturerForm(lecturerResponse: any) {
    this.lecturerForm.patchValue({
      lecturer_name: lecturerResponse.lecturer_name,
      department: lecturerResponse.department,
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
      },
      complete: () => {},
      error: (error: any) => {
        console.log(error);
        alert("Cập nhật thông tin tài khoản sinh viên thất bại.");
      }
    });
  }

  submitLecturer() {
    this.user_id = Number(localStorage.getItem('user_id'));
  
    // Lấy dữ liệu từ lecturerForm
    const val = {
      lecturer_id: this.lecturer.lecturer_id,
      lecturer_name: this.lecturer.lecturer_name,
      department: this.lecturerForm.get('department')?.value,
      user_id: this.lecturer.user_id
      
    };
  
    console.log("Data submitted:", val);
  
    this.lecturerService.updateLecturer(this.user_id, val).subscribe({
      next: (response: any) => {
        console.log("Response:", response);
        alert("Cập nhật thông tin giảng viên thành công.");
        const userId = Number(localStorage.getItem('user_id'));      
        this.getLecturerById(userId);
      },
      error: (error: any) => {
        console.error("Error:", error);
        alert("Cập nhật thông tin giảng viên thất bại.");
      },
    });
  }
}
