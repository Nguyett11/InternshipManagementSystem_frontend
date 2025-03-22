import { Component } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student.company',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.company.component.html',
  styleUrl: './student.company.component.css'
})
export class StudentCompanyComponent {
    keyword:string = "";
    currentPage: number = 0;
    companyList : Company[];
    localStorage?: Storage;
    itemsPerPage: number = 3;
    visiblePages: number[] = [];
    totalPages: number = 0;
    limit : number;

  constructor( private companyService : CompanyService
    ) { }
  
    ngOnInit(): void {
      this.getCompanies(this.keyword, this.currentPage, 5);
    }
  
  //Lấy danh sách công ty
  getCompanies(keyword: string, page: number, limit: number){
    this.companyService.getCompanies(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.companyList = response.companies;
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
    this.getCompanies(this.keyword, this.currentPage, this.itemsPerPage);
  }

}
