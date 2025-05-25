import { Component, Inject, OnInit } from '@angular/core';
import { Student } from '../../../models/student';
import { environment } from '../../../environments/environment'; 
import { CommonModule, DOCUMENT } from '@angular/common';
import { UserResponse } from '../../../responses/user/user.response'; 
import { ReportService } from '../../../services/report.service'; 
import { report } from '../../../models/report'; 
import { Submission } from '../../../models/submission';
import { SubmissionService } from '../../../services/submission.service'; 
import { Router, RouterModule } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { StudentService } from '../../../services/student.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student.weekly-report',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,
    FormsModule],
  templateUrl: './student.weekly-report.component.html',
  styleUrl: './student.weekly-report.component.css'
})
export class StudentWeeklyReportComponent {
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


  reportList : report[];
  reportUnSubmitted : report;
  errorMessage : string;
  searchTerm : string;

  selectedFile: File | null = null;
  reportId: number; 
  studentCode: number; 
  selectedReport: any;

  dangThemSua : boolean;

  constructor(
    private reportService: ReportService,
    private submissionService: SubmissionService,
    private studentService : StudentService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }

  ngOnInit(): void {
    this.loadUnsubmittedReports();

    const userId = Number(localStorage.getItem('user_id'));
    this.studentService.getStudentById(userId).subscribe({
      next: (data) => {
        this.studentCode = data.student_code;    
      },
      error: (error: any) => {
        console.error('Error fetching students:', error);
      }
    });
  }

  loadUnsubmittedReports(): void {
    const userId = Number(localStorage.getItem('user_id'));
    this.studentService.getStudentById(userId).subscribe({
      next: (data) => {
        this.reportService.getUnsubmittedReports(data.student_code).subscribe({
          next: (data) => {
            this.reportList = data;
            console.log(this.reportList);

          },
          error: (err) => {
            console.error('Lỗi khi tải báo cáo chưa nộp:', err);
          }
        });
        
      },
      error: (error: any) => {
        console.error('Error fetching students:', error);
      }
    });
  }

  searchReports() {
    const userId = Number(localStorage.getItem('user_id'));
    this.studentService.getStudentById(userId).subscribe({
      next: (data) => {
        this.reportService.searchUnsubmittedReports(data.student_code, this.searchTerm)
      .subscribe(
        (data) => {
          this.reportList = data;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Không tìm thấy báo cáo chưa nộp nào.';
          this.reportList = [];
        }
      );        
      },
      error: (error: any) => {
        console.error('Error fetching students:', error);
      }
    });
  }

  setSelectedReport(report: any) {
    this.selectedReport = report;
    console.log("set select: ", this.selectedReport);
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
      status: ''
    }
    this.dangThemSua = true;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile) {
      alert("Vui lòng chọn file.");
      return;
    }
    this.submissionService.uploadSubmission(this.selectedReport.report_id, this.studentCode, this.selectedFile)
      .subscribe({
        next: (res: any) => alert(res.message),
        error: (err) => alert(err.error?.message || "Lỗi khi upload.")
      });
  }
}
