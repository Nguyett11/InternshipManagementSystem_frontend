import { Component, inject } from '@angular/core';
import { MentorResponse } from '../../../../responses/mentor/mentor.response';
import { Role } from '../../../../models/role';
import { MentorService } from '../../../../services/mentorService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mentor.admin.detail',
  standalone: true,
  imports: [],
  templateUrl: './mentor.admin.detail.component.html',
  styleUrl: './mentor.admin.detail.component.css'
})
export class MentorAdminDetailComponent {
mentorResponse: MentorResponse = {
  id: 0,
  mentor_name: '',
  company_id : 0,
  company_name: '',
  position : '',
  userId : 0,
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
  private mentorService = inject(MentorService);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMentorDetails();
  }

  getMentorDetails(): void {
    debugger;
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.mentorService.getDetailMentor(id).subscribe({
      next: (response: any) => {
        debugger;
  
        const data = response.data;
  
        this.mentorResponse.id = data.id;
        this.mentorResponse.mentor_name = data.mentor_name;
        this.mentorResponse.company_id = data.company_id;
        this.mentorResponse.position = data.position;
        this.mentorResponse.userId = data.userId;
        this.mentorResponse.user_response.full_name = data.user_response.full_name;
        this.mentorResponse.user_response.email = data.user_response.email;
        this.mentorResponse.user_response.phone_number = data.user_response.phone_number;
        this.mentorResponse.user_response.gender = data.user_response.gender;
        this.mentorResponse.user_response.date_of_birth = new Date(data.user_response.date_of_birth);
        this.mentorResponse.user_response.desired_role = data.user_response.desired_role;
        this.mentorResponse.user_response.is_active = data.user_response.is_active;
        this.mentorResponse.user_response.role = data.user_response.role;
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
