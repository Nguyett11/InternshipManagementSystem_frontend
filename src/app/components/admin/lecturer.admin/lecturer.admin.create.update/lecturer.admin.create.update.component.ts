import { Component, Input } from '@angular/core';
import { Lecturer } from '../../../../models/lecturer';
import { LecturerService } from '../../../../services/lecturer.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lecturer-admin-create-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lecturer.admin.create.update.component.html',
  styleUrl: './lecturer.admin.create.update.component.css'
})
export class LecturerAdminCreateUpdateComponent {
  @Input() lecturer : Lecturer;
  totalPages: number = 0;
  keyword:string = "";
  currentPage: number = 0;
  userList : User[] ;
  visiblePages: number[] = [];

  id : number;
  lecturer_name : string ;
  department : string;
  user_id : number;

  constructor( private lecturerService : LecturerService, private userService : UserService
  ) { }

  ngOnInit(): void {
    if (this.lecturer) {
      this.id = this.lecturer.id;
      this.lecturer_name = this.lecturer.lecturer_name;
      this.department = this.lecturer.department;
      this.user_id = this.lecturer.user_id;
    }

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
  createLecturer() {
    var val = {
      lecturer_name : this.lecturer_name,
      department : this.department,
      user_id : this.user_id
    }
    this.lecturerService.insertLecturer(val).subscribe({  
      next: (response: any) => {
        console.log(val);
        alert("Thêm thông tin thực tập sinh viên thành công.");
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log(error);
        alert("Thêm thông tin thực tập sinh viên thất bại");
      }
    });
  }

  //Cập nhật sinh viên
  updateLecturer(lecturer: Lecturer){
    var val = {
      id : this.id,
      lecturer_name : this.lecturer_name,
      department : this.department,
      user_id: this.user_id
    }
    this.lecturerService.updateLecturer(lecturer.id, val).subscribe({
      next: (response: any) => {
        alert("Cập nhật thông tin thực tập sinh viên thành công.");
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log(error);
        alert("Cập nhật thông tin thực tập sinh viên thất bại.");
      }
    });
  }
}
