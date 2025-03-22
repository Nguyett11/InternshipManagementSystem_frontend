import { Component, inject, Input  } from '@angular/core';
import { LecturerResponse } from '../../../../responses/lecturer/lecturer.response';
import { Role } from '../../../../models/role';
import { LecturerService } from '../../../../services/lecturer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lecturer } from '../../../../models/lecturer';

@Component({
  selector: 'app-lecturer.admin.detail',
  standalone: true,
  imports: [],
  templateUrl: './lecturer.admin.detail.component.html',
  styleUrl: './lecturer.admin.detail.component.css'
})
export class LecturerAdminDetailComponent {
lecturerResponse: LecturerResponse = {
  id: 0,
  lecturer_name: '',
  department: '',
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
  private lecturerService = inject(LecturerService);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLecturerDetails();
  }

  getLecturerDetails(): void {
    debugger;
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.lecturerService.getDetailLecturer(id).subscribe({
      next: (response: any) => {
        debugger;
  
        const data = response.data;

        this.lecturerResponse.id = data.id;
        this.lecturerResponse.lecturer_name = data.lecturer_name;
        this.lecturerResponse.department = data.department;
        this.lecturerResponse.user_response.full_name = data.user_response.full_name;
        this.lecturerResponse.user_response.email = data.user_response.email;
        this.lecturerResponse.user_response.phone_number = data.user_response.phone_number;
        this.lecturerResponse.user_response.gender = data.user_response.gender;
        this.lecturerResponse.user_response.date_of_birth = new Date(data.user_response.date_of_birth);
        this.lecturerResponse.user_response.desired_role = data.user_response.desired_role;
        this.lecturerResponse.user_response.is_active = data.user_response.is_active;
        this.lecturerResponse.user_response.role = data.user_response.role;
        
      },
      complete: () => {
        debugger;
        console.log("kkk",this.lecturerResponse);
        console.log('Student details fetched successfully.');
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching student details:', error);
      },
    });
  }  
}
