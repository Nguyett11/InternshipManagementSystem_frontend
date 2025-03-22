import { Component, Input } from '@angular/core';
import { Mentor } from '../../../../models/mentor';
import { MentorService } from '../../../../services/mentorService';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { CompanyService } from '../../../../services/company.service';
import { User } from '../../../../models/user';
import { Company } from '../../../../models/company';

@Component({
  selector: 'app-mentor-admin-create-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mentor.admin.create.update.component.html',
  styleUrl: './mentor.admin.create.update.component.css'
})
export class MentorAdminCreateUpdateComponent {
  @Input() mentor : Mentor;
  id : number;
  mentor_name : string;
  company_id : number;
  position : string;
  user_id : number;
  userList : User[];
  companyList : Company[];

  totalPages: number = 0;
  keyword:string = "";
  currentPage: number = 0;
  visiblePages: number[] = [];

  constructor( private mentorService : MentorService, private userService : UserService, private companyService : CompanyService
    ) { }
  
    ngOnInit(): void {
      if (this.mentor) {
        this.id = this.mentor.id;
        this.mentor_name = this.mentor.mentor_name;
        this.position = this.mentor.position;
        this.company_id = this.mentor.company_id;
        this.user_id = this.mentor.user_id;
      }
      this.getCompanys(this.keyword, this.currentPage, 100);
      this.getUsers(this.keyword, this.currentPage, 100);
    }

  //lấy danh sách user
  getUsers(keyword: string, page: number, limit: number){
    this.userService.getUsers(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.userList = response.users;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
      },
      error: (error: any) => {

        console.error('Error fetching students:', error);
      }
    });
  }

  //lấy danh sách company
  getCompanys(keyword: string, page: number, limit: number){
    this.companyService.getCompanies(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.companyList = response.companies;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
      },
      error: (error: any) => {

        console.error('Error fetching students:', error);
      }
    });
  }
  
  //Phân trang
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    debugger
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  
    debugger
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
  
    debugger
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
  
    debugger
    return new Array(endPage - startPage + 1).fill(0)
      .map((_, index) => startPage + index);
  }

  //Tạo sinh viên
  createMentor() {
    var val = {
      mentor_name : this.mentor_name,
      company_id : this.company_id,
      position : this.position,
      user_id : this.user_id
    }
    this.mentorService.insertMentor(val).subscribe({  
      next: (response: any) => {
        console.log(val);
        alert("Thêm thông tin người hướng dẫn thành công.");
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log(error);
        alert("Thêm thông tin người hướng dẫn thất bại");
      }
    });
  }

  updateMentor(mentor: Mentor){
      var val = {
        id : this.id,
        mentor_name : this.mentor_name,
        company_id : this.company_id,
        position : this.position,
        user_id: this.user_id
      }
      this.mentorService.updateMentor(mentor.id, val).subscribe({
        next: (response: any) => {
          alert("Cập nhật thông tin người hướng dẫn thành công.");
        },
        complete: () => {
        },
        error: (error: any) => {
          console.log(error);
          alert("Cập nhật thông tin người hướng dẫn thất bại.");
        }
      });
    }
}
