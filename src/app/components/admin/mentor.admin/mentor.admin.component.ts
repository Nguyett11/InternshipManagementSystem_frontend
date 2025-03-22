import { Component } from '@angular/core';
import { MentorService } from '../../../services/mentorService';
import { Mentor } from '../../../models/mentor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MentorAdminCreateUpdateComponent } from './mentor.admin.create.update/mentor.admin.create.update.component';
import { UserAdminUpdateAccountComponent } from '../user.admin/user.admin.update-account/user.admin.update-account.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-mentor.admin',
  standalone: true,
  imports: [FormsModule, CommonModule, MentorAdminCreateUpdateComponent, UserAdminUpdateAccountComponent],
  templateUrl: './mentor.admin.component.html',
  styleUrl: './mentor.admin.component.css'
})
export class MentorAdminComponent {

  mentorList: Mentor[] = [];
  keyword:string = "";
  visiblePages: number[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  limit : number;
  localStorage?: Storage;
  itemsPerPage: number = 3; 
  mentor : Mentor; 
  dangThemSua : boolean;

  constructor( private mentorService : MentorService, private router: Router, private userService : UserService
    ) { }

    ngOnInit(): void {
      this.getMentors(this.keyword, this.currentPage, 5);
    }   

  //lấy danh sách mentor
  getMentors(keyword: string, page: number, limit: number){
    this.mentorService.getMentors(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.mentorList = response.mentors;
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

  onPageChange(page: number) {
    debugger;
    this.currentPage = page < 0 ? 0 : page;
    this.localStorage?.setItem('currentStudentPage', String(this.currentPage)); 
    this.getMentors(this.keyword, this.currentPage, this.itemsPerPage);
  }
  searchMentor() {
    this.currentPage = 0;
    this.itemsPerPage = 3;
    debugger;
    this.getMentors(this.keyword, this.currentPage,  this.itemsPerPage);
  }

  // Hàm xử lý sự kiện khi sản phẩm được bấm vào
  onMentorClick(id: number) {
    debugger;
    // Điều hướng đến trang detail-student với studentId là tham số
    this.router.navigate(['admin/mentors', id]);
  }

  addMentor(){
      this.mentor = 
      {
        id : 0,
        mentor_name : '',
        company_id : 0,
        company_name : '',
        position : '',
        user_id : 0
      }
      this.dangThemSua = true;
    }
    
  dong(){
    this.dangThemSua = false;
    this.getMentors(this.keyword, this.currentPage, this.itemsPerPage);
  }

  updateMentor(mentor: Mentor){
        this.mentor = mentor;
        this.dangThemSua = true;
    }
  updateUser(mentor: Mentor){
    this.mentor = mentor;
    this.dangThemSua = true;
  }
  deleteUser(id: number) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      this.userService.deleteUser(id).subscribe({
        next: (response: any) => {
          alert("Xóa tài khoản sinh viên thành công.");
          this.getMentors(this.keyword, this.currentPage, this.itemsPerPage);
        },
        error: (error: any) => {
          console.error(error);
          alert("Xóa tài khoản sinh viên thất bại.");
        },
        complete: () => {
          // Có thể thêm logic hoàn tất tại đây nếu cần
        }
      });
    } else {
      alert("Hủy xóa tài khoản sinh viên.");
    }
  }
}
