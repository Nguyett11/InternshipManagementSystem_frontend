import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ReportService } from '../../../services/report.service';
import { Router } from '@angular/router';
import { Report } from '../../../models/report';

@Component({
  selector: 'app-list-report',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './list-report.component.html',
  styleUrl: './list-report.component.css'
})
export class ListReportComponent implements OnInit{
  reports: Report[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  keyword:string = "";
  visiblePages: number[] = [];
  localStorage?: Storage;
  apiBaseUrl = environment.apiBaseUrl;

  constructor(
      private reportService: ReportService,
      private router: Router,
      @Inject(DOCUMENT) private document: Document
    ) {
      this.localStorage = document.defaultView?.localStorage;
    }
    ngOnInit(): void {
      debugger
      this.currentPage = Number(this.localStorage?.getItem('currentStudentPage')) || 0; 
      this.getReportsByLecturer(this.keyword, this.currentPage, this.itemsPerPage);
    }
    searchStudents() {
      this.currentPage = 0;
      this.itemsPerPage = 10;
      this.getReportsByLecturer(this.keyword, this.currentPage, this.itemsPerPage);
    }
    
    getReportsByLecturer(keyword: string, page: number, limit: number) {
      debugger
      this.reportService.getReportsByLecturer(keyword, page, limit).subscribe({
        next: (response: any) => {
          debugger
          this.reports = response.reports;
          this.totalPages = response.totalPages;
          debugger
          this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
        },
        complete: () => {
        },
        error: (error: any) => {
  
          console.error('Error fetching students:', error);
        }
      });
    }
  
    onPageChange(page: number) {
      debugger;
      this.currentPage = page < 0 ? 0 : page;
      this.localStorage?.setItem('currentStudentPage', String(this.currentPage)); 
      this.getReportsByLecturer(this.keyword, this.currentPage, this.itemsPerPage);
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
    onClick(reportId: number) {
      this.router.navigate(['lecturer/submissionlist', reportId]);
    }
    
}
