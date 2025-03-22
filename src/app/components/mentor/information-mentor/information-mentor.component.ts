import { Component } from '@angular/core';
import { LecturerResponse } from '../../../responses/lecturer/lecturer.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MentorService } from '../../../services/mentorService';
import { MentorResponse } from '../../../responses/mentor/mentor.response';

@Component({
  selector: 'app-information-mentor',
  standalone: true,
  imports: [],
  templateUrl: './information-mentor.component.html',
  styleUrl: './information-mentor.component.css'
})
export class InformationMentorComponent {
mentor: MentorResponse; // Biến lưu thông tin giảng viên
  dangThemSua : boolean;
  tieude : string;
  userForm: FormGroup;
  mentorForm: FormGroup;
  user_id : number;
  mentor_name : string;
  department : string;
  company_id : number;
  position : string;


  constructor(private mentorService: MentorService, private fb: FormBuilder, private userService : UserService) {
    // Khởi tạo form
    this.userForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      desired_role: [''],
      gender: [''],
    });
    this.mentorForm = this.fb.group({
      company_id: ['', Validators.required],
      mentor_name: ['', [Validators.required]],
      position: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getMentorInfo(); // Gọi hàm khi component được khởi tạo

  }

  getMentorInfo(): void {
    this.mentorService.getMentorByToken().subscribe({
      next: (response) => {
        console.log(response);
        this.mentor = response.data; // Lưu thông tin giảng viên vào biến
        this.user_id = response.data.user_response.id;
        console.log('Mentor data:', response); // Log dữ liệu giảng viên
      },
      error: (error) => {
        console.error('Error fetching lecturer data:', error); // Log lỗi nếu có
      }
    });
  }
}
