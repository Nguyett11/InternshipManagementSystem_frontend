import { Component, Inject, OnInit } from '@angular/core';
import { Student } from '../../../models/student';
import { environment } from '../../../environments/environment'; 
import { CommonModule, DOCUMENT } from '@angular/common';
import { UserResponse } from '../../../responses/user/user.response'; 
import { ReportService } from '../../../services/report.service'; 
import { Report } from '../../../models/report'; 
import { Submission } from '../../../models/submission';
import { SubmissionService } from '../../../services/submission.service'; 
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student.report',
  standalone: true,
  imports: [    CommonModule,
          RouterModule,],
  templateUrl: './student.report.component.html',
  styleUrl: './student.report.component.css'
})
export class StudentReportComponent {
  reports: Report[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  keyword: string = "";
  visiblePages: number[] = [];
  localStorage?: Storage;
  apiBaseUrl = environment.apiBaseUrl;
  submission : Submission;
  userResponse?: UserResponse | null;


  id: number;
  student_name: string;
  student_class: string;
  report_id: number;
  student_code: number;
  file: string;
  submission_date: Date;
  status_submission: string = "Đã nộp";

  dangThemSua : boolean;

  constructor(
    private reportService: ReportService,
    private submissionService: SubmissionService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }

  ngOnInit(): void {
    debugger
    this.currentPage = Number(this.localStorage?.getItem('currentStudentPage')) || 0; 
    this.getReportsByStudentCode(this.keyword, this.currentPage, this.itemsPerPage);
  }
  searchStudents() {
    this.currentPage = 0;
    this.itemsPerPage = 10;
    this.getReportsByStudentCode(this.keyword, this.currentPage, this.itemsPerPage);
  }
  
  getReportsByStudentCode(keyword: string, page: number, limit: number) {
    debugger
    this.reportService.getReportsByStudentCode(keyword, page, limit).subscribe({
      next: (response: any) => {
        debugger
        this.reports = response.reportByStudentResponses;
        console.log("student: ",response);
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
    this.getReportsByStudentCode(this.keyword, this.currentPage, this.itemsPerPage);
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

  createReport(){
    this.submission = 
    {
      id: 0,
      student_name: '',
      student_class: '',
      report_id: 0,
      student_code: 0,
      file: '',
      submission_date: new Date(),
      status_submission: ''
    }
    this.dangThemSua = true;
  }

  dong(){
    this.dangThemSua = false;
    this.getReportsByStudentCode(this.keyword, this.currentPage, this.itemsPerPage);
  }



   //Nộp báo cáo
   submitReport(id : number) {
    // var val = {
    //   id : this.id,
    //   report_id: this.id,
    //   student_code: this.student_code,
    //   file_path: this.file_path,
    //   submission_date: new Date(),
    //   status: this.status
    // }
    // this.studentService.insertStudent(val).subscribe({  
    //   next: (response: any) => {
    //     console.log(response);
    //   },
    //   complete: () => {
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   }
    // });
  }

  onFileUpload(event: any, reportId: number) {
    if (!event.target.files || event.target.files.length === 0) {
        console.error('No file selected');
        return;
    }

    const file: File = event.target.files[0];
    const validExtensions = ['.doc', '.docx'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
        console.error('Invalid file type. Please upload a .doc or .docx file.');
        return;
    }

    this.submissionService.uploadFileWord(reportId, file).subscribe({
        next: (response) => {
          debugger
            console.log('Upload successful', response);
        },
        error: (error) => {
            console.error('Upload failed', error);
            //alert('File upload failed. Please try again.');
        },
    });
}
}
