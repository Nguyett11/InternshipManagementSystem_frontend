import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { CommonModule, DOCUMENT, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-user.admin',
  standalone: true,
  imports: [CommonModule,
      FormsModule],
  templateUrl: './user.admin.component.html',
  styleUrl: './user.admin.component.css'
})
export class UserAdminComponent {

userList : User[];
currentPage: number = 0;
itemsPerPage: number = 3;
totalPages: number = 0;
keyword:string = "";
visiblePages: number[] = [];
localStorage?: Storage;
role_name: string;
tieude: string;
dangThemSua: boolean;
is_active: boolean;
selectedUserId: number;
user_id: number;
active_number : number = 0;
role: Role = { id: 0, name: '' }; // Khởi tạo role với giá trị mặc định
id: number;
isActive: boolean;

constructor( private userService : UserService) { }

  ngOnInit(): void {
    this.getUsers(this.keyword, this.currentPage, 100);
  }

  getUsers(keyword: string, page: number, limit: number){
    this.userService.getUsers(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.userList = response.users;
        console.log(this.userList);
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
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }
  deleteUser(id: number) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      this.userService.deleteUser(id).subscribe({
        next: (response: any) => {
          alert("Xóa tài khoản sinh viên thành công.");
          this.getUsers(this.keyword, this.currentPage, this.itemsPerPage);
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

  onUserSelect(user: User) {
    this.selectedUserId = user.id;
    this.is_active = user.is_active; 
  }

  userSelect(user: User) {
    this.selectedUserId = user.id;
    this.role = { id: user.role.id, name: user.role.name }; // Cập nhật role từ user
}

  updateUserActiveStatus() {
    if (confirm("Bạn có chắc chắn muốn cập nhật trạng thái của tài khoản này không?")) {
      debugger;
    this.isActive = this.is_active; // is_active là kiểu boolean
      
    console.log("Giá trị is_active:", this.is_active); // Kiểm tra giá trị của is_active
    console.log("Giá trị isActive sau khi gán:", this.isActive); // Kiểm tra giá trị của isActive
  
      if (this.isActive ) {
        console.log("isActive là true, gán active_number = 1");
      } else {
        console.log("isActive là false, gán active_number = 0");
      }
      // Chuyển đổi is_active (boolean) sang active_number (number)
      this.active_number = this.isActive  ? 1 : 0; // 1: Active, 0: Block
  
      console.log("Giá trị active_number:", this.active_number); // Kiểm tra giá trị của active_number
  
      this.userService.blockOrEnableUser(this.selectedUserId, this.active_number).subscribe({
        next: (response: any) => {
          debugger;
          console.log(this.is_active, this.selectedUserId);
          alert("Cập nhật thông tin tài khoản sinh viên thành công.");
          this.getUsers(this.keyword, this.currentPage, this.itemsPerPage); // Cập nhật lại danh sách sau khi thay đổi
        },
        complete: () => {
        },
        error: (error: any) => {
          console.log(error);
          alert("Cập nhật thông tin tài khoản sinh viên thất bại.");
        }
      });
    }
  }

  onGrantRole(): void {
    if (this.selectedUserId && this.role.id) {
      console.log("Granting role with data:", {
        userId: this.selectedUserId,
        roleId: this.role.id
      });
  
      this.userService.grantRole(this.selectedUserId, this.role.id).subscribe({
        next: (response) => {
          alert("Phân quyền thành công!");
          this.getUsers(this.keyword, this.currentPage, this.itemsPerPage); // Cập nhật danh sách người dùng
        },
        error: (err) => {
          alert("Đã xảy ra lỗi khi phân quyền.");
          console.error(err);
        }
      });
    } else {
      alert("Vui lòng nhập đủ thông tin.");
    }
  }
  

  dong(){
    this.dangThemSua = false;
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }
}
