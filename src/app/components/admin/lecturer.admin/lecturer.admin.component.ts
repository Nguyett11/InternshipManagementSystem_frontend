import { Component } from '@angular/core';
import { LecturerService } from '../../../services/lecturer.service';
import { Lecturer } from '../../../models/lecturer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LecturerAdminCreateUpdateComponent } from './lecturer.admin.create.update/lecturer.admin.create.update.component';
import { UserAdminUpdateAccountComponent } from '../user.admin/user.admin.update-account/user.admin.update-account.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-lecturer.admin',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    LecturerAdminCreateUpdateComponent,
    UserAdminUpdateAccountComponent
  ],
  templateUrl: './lecturer.admin.component.html',
  styleUrl: './lecturer.admin.component.css'
})
export class LecturerAdminComponent {

  lecturerList: Lecturer[] = [];
  keyword: string = "";
  visiblePages: number[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  limit: number;
  localStorage?: Storage;
  itemsPerPage: number = 3;
  lecturer: Lecturer;
  dangThemSua: boolean;

  constructor(private lecturerService: LecturerService, private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getLectures(this.keyword, this.currentPage, 5);
  }

  //lấy danh sách lecturer
  getLectures(keyword: string, page: number, limit: number) {
    this.lecturerService.getLectures(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.lecturerList = response.lecturers;
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
    this.getLectures(this.keyword, this.currentPage, this.itemsPerPage);
  }

  // Hàm xử lý sự kiện khi sản phẩm được bấm vào
  onStudentClick(id: number) {
    debugger;
    // Điều hướng đến trang detail-student với studentId là tham số
    this.router.navigate(['admin/lecturers', id]);
  }

  addLecturer() {
    this.lecturer =
    {
      id: 0,
      lecturer_name: '',
      department: '',
      user_id: 0
    }
    this.dangThemSua = true;
  }

  dong() {
    this.dangThemSua = false;
    this.getLectures(this.keyword, this.currentPage, this.itemsPerPage);
  }

  updateLecturer(lecturer: Lecturer) {
    this.lecturer = lecturer;
    this.dangThemSua = true;
  }
  updateUser(lecturer: Lecturer) {
    this.lecturer = lecturer;
    this.dangThemSua = true;
  }
  searchlecturer() {
    this.currentPage = 0;
    this.itemsPerPage = 3;
    debugger;
    this.getLectures(this.keyword, this.currentPage, this.itemsPerPage);
  }
  deleteUser(id: number) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      this.userService.deleteUser(id).subscribe({
        next: (response: any) => {
          alert("Xóa tài khoản sinh viên thành công.");
          this.getLectures(this.keyword, this.currentPage, this.itemsPerPage);
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
