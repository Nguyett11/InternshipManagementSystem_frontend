import { Component } from '@angular/core';
import { Lecturer } from '../../../models/lecturer';
import { LecturerService } from '../../../services/lecturer.service';
import { LecturerResponse } from '../../../responses/lecturer/lecturer.response';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-information-lecturer',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './information-lecturer.component.html',
  styleUrl: './information-lecturer.component.css'
})
export class InformationLecturerComponent {
  lecturer: LecturerResponse; // Biến lưu thông tin giảng viên
  dangThemSua : boolean;
  tieude : string;
  userForm: FormGroup;
  lecturerForm: FormGroup;
  user_id : number;
  lecturer_name : string;
  department : string;

  constructor(private lecturerService: LecturerService, private fb: FormBuilder, private userService : UserService) {
    // Khởi tạo form
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
    this.getLecturerInfo(); // Gọi hàm khi component được khởi tạo

  }

  getLecturerInfo(): void {
    this.lecturerService.getLecturerByToken().subscribe({
      next: (response) => {
        this.lecturer = response.data; // Lưu thông tin giảng viên vào biến
        this.user_id = response.data.user_response.id;
        console.log('Lecturer data:', response); // Log dữ liệu giảng viên
      },
      error: (error) => {
        console.error('Error fetching lecturer data:', error); // Log lỗi nếu có
      }
    });
  }
  dong(){
    this.dangThemSua = false;
    this.getLecturerInfo();
  }

  updateLecturer(lecturer: LecturerResponse){
      this.lecturer = lecturer;
      this.dangThemSua = true;
      this.tieude = "Sửa giảng viên";
      this.setLecturerForm(lecturer);
  }
  updateUser(lecturer: LecturerResponse){
    this.lecturer = lecturer;
    this.dangThemSua = true;
    this.tieude = "Sửa thông tin tài khoản";
    this.setUserForm(lecturer.user_response);
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
  // Hàm để thiết lập giá trị cho form khi mở modal
  setLecturerForm(lecturerResponse: any) {
    this.lecturerForm.patchValue({
      lecturer_name: lecturerResponse.lecturer_name,
      department: lecturerResponse.department,
    });
  }
  

  submitLecturer() {
    this.user_id = Number(localStorage.getItem('user_id'));
  
    // Lấy dữ liệu từ lecturerForm
    const val = {
      lecturer_name: this.lecturerForm.get('lecturer_name')?.value,
      department: this.lecturerForm.get('department')?.value,
    };
  
    console.log("Data submitted:", val);
  
    this.lecturerService.updateLecturer(this.user_id, val).subscribe({
      next: (response: any) => {
        console.log("Response:", response);
        alert("Cập nhật thông tin giảng viên thành công.");
      },
      error: (error: any) => {
        console.error("Error:", error);
        alert("Cập nhật thông tin giảng viên thất bại.");
      },
    });
  }
  
  submitUser() {
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

    console.log("user: ",val);
  
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
