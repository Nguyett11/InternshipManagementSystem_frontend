import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { StudentService } from '../../../../services/student.service';
import { LecturerService } from '../../../../services/lecturer.service';
import { MentorService } from '../../../../services/mentorService';
import { User } from '../../../../models/user';
import { Student } from '../../../../models/student';
import { Lecturer } from '../../../../models/lecturer';
import { Mentor } from '../../../../models/mentor';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-admin-update',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user.admin.update-account.component.html',
  styleUrls: ['./user.admin.update-account.component.css']
})
export class UserAdminUpdateAccountComponent implements OnInit {

  @Input() lecturer?: Lecturer;
  @Input() mentor?: Mentor;
  @Input() student?: Student;

  userForm: FormGroup;
  isLoading = true;
  user: User;
  userId: number;
  id: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private userService: UserService,
    private lecturerService: LecturerService,
    private mentorService: MentorService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.student) {
      this.id = this.student.student_code;
      this.userId = this.student.user_id;
      this.loadUserDetailsByStudent(this.id);
    } else if (this.lecturer) {
      this.id = this.lecturer.id;
      this.userId = this.lecturer.user_id;
      this.loadUserDetailsByLecturer(this.id);
    } else if (this.mentor) {
      this.id = this.mentor.id;
      this.userId = this.mentor.user_id;
      this.loadUserDetailsByMentor(this.id);
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: [''],
      dateOfBirth: [''],
      desiredRole: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isActive: ['1']
    });
  }

  loadUserDetailsByStudent(id: number): void {
    this.studentService.getDetailStudent(id).subscribe({
      next: (response: any) => this.populateUserForm(response.data.user_response),
      error: (error: any) => console.error("Error fetching student details:", error)
    });
  }

  loadUserDetailsByLecturer(id: number): void {
    this.lecturerService.getDetailLecturer(id).subscribe({
      next: (response: any) => this.populateUserForm(response.data.user_response),
      error: (error: any) => console.error("Error fetching lecturer details:", error)
    });
  }

  loadUserDetailsByMentor(id: number): void {
    this.mentorService.getDetailMentor(id).subscribe({
      next: (response: any) => this.populateUserForm(response.data.user_response),
      error: (error: any) => console.error("Error fetching mentor details:", error)
    });
  }

  private populateUserForm(user: User): void {
    if (user) {
      this.user = user;
      this.userForm.patchValue({
        full_name: user.full_name || '',
        email: user.email || '',
        phoneNumber: user.phone_number || '',
        gender: user.gender || '',
        dateOfBirth: user.date_of_birth || '',
        desiredRole: user.desired_role || '',
      });
    } else {
      console.error("User data is missing.");
    }
  }

  updateUser(): void {
    if (this.userForm.invalid) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const updatedUser = {
      full_name: this.userForm.get('full_name')?.value,
      email: this.userForm.get('email')?.value,
      phone_number: this.userForm.get('phoneNumber')?.value,
      gender: this.userForm.get('gender')?.value,
      date_of_birth: this.userForm.get('dateOfBirth')?.value,
      desired_role: this.userForm.get('desiredRole')?.value
    };

    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: () => alert("Cập nhật thông tin thành công."),
      error: (error: any) => {
        console.error("Error updating user:", error);
        alert("Cập nhật thông tin thất bại.");
      }
    });
  }
}
