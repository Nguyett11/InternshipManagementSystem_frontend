import { Component } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyAdminCreateUpdateComponent } from './company.admin.create.update/company.admin.create.update.component';

@Component({
  selector: 'app-company.admin',
  standalone: true,
  imports: [FormsModule, CommonModule, CompanyAdminCreateUpdateComponent],
  templateUrl: './company.admin.component.html',
  styleUrl: './company.admin.component.css'
})
export class CompanyAdminComponent {
  keyword:string = "";
  visiblePages: number[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  limit : number;
  localStorage?: Storage;
  itemsPerPage: number = 3;
  company : Company;
  dangThemSua : boolean;

  companyList : Company[];

  constructor(private companyService : CompanyService) { }

  ngOnInit(): void {
    this.getCompanies(this.keyword, this.currentPage, 5);
  }

  //lấy danh sách lecturer
  getCompanies(keyword: string, page: number, limit: number){
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

  onPageChange(page: number) {
    debugger;
    this.currentPage = page < 0 ? 0 : page;
    this.localStorage?.setItem('currentStudentPage', String(this.currentPage)); 
    this.getCompanies(this.keyword, this.currentPage, this.itemsPerPage);
  }
  searchCompany() {
    this.currentPage = 0;
    this.itemsPerPage = 3;
    debugger;
    this.getCompanies(this.keyword, this.currentPage,  this.itemsPerPage);
  }
  addCompany(){
    this.company = 
    {
      id : 0,
      company_name : '',
      address : '',
      contact_person : '',
      email : '',
      phone_number : ''
    }
    this.dangThemSua = true;
  }

  dong(){
    this.dangThemSua = false;
    this.getCompanies(this.keyword, this.currentPage, this.itemsPerPage);
  }

  updateCompany(company: Company){
        this.company = company;
        this.dangThemSua = true;
    }
  deleteCompany(id: number) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      this.companyService.deleteCompany(id).subscribe({
        next: (response: any) => {
          alert("Xóa tài khoản sinh viên thành công.");
          this.getCompanies(this.keyword, this.currentPage, this.itemsPerPage);
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
