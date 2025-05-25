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
    debugger
    // this.currentPage = Number(this.localStorage?.getItem('currentStudentPage')) || 0; 
    // this.getReportsByStudentCode(this.keyword, this.currentPage, this.itemsPerPage);

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

  // getReportUnsubmitted(){
  //   this.reportService.getAllReports().subscribe({
  //     next: (response: any) => {
  //       debugger
  //       this.reportList = response;
  //      // console.log(this.reportList);

  //     this.reportList.forEach(report => {
  //       this.reportService.getReportIfNotSubmitted(report.report_id, this.student_code).subscribe({
  //         next: (data) => {
  //           this.reportUnSubmitted = data
  //           console.log(`Submission cho report`, this.reportUnSubmitted);
  //         },
  //         error: (err) => {
  //           console.error(`Lỗi lấy submission cho report ${report.report_id}:`, err);
  //         }
  //       });
  //     });
  //     },
  //     complete: () => {
  //     },
  //     error: (error: any) => {

  //       console.error('Error fetching students:', error);
  //     }
  //   });
  // }






  // searchStudents() {
  //   this.currentPage = 0;
  //   this.itemsPerPage = 10;
  //   this.getReportsByStudentCode(this.keyword, this.currentPage, this.itemsPerPage);
  // }
  
  // getReportsByStudentCode(keyword: string, page: number, limit: number) {
  //   debugger
    // this.reportService.getReportsByStudentCode(keyword, page, limit).subscribe({
    //   next: (response: any) => {
    //     debugger
    //     this.reports = response.reportByStudentResponses;
    //     console.log("student: ",response);
    //     this.totalPages = response.totalPages;
    //     debugger
    //     this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
    //   },
    //   complete: () => {
    //   },
    //   error: (error: any) => {

    //     console.error('Error fetching students:', error);
    //   }
    // });
  //}

  // onPageChange(page: number) {
  //   debugger;
  //   this.currentPage = page < 0 ? 0 : page;
  //   this.localStorage?.setItem('currentStudentPage', String(this.currentPage)); 
  //   this.getReportsByStudentCode(this.keyword, this.currentPage, this.itemsPerPage);
  // }
  
  // generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
  //   debugger
  //   const maxVisiblePages = 5;
  //   const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  
  //   debugger
  //   let startPage = Math.max(currentPage - halfVisiblePages, 1);
  //   let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
  
  //   debugger
  //   if (endPage - startPage + 1 < maxVisiblePages) {
  //     startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  //   }
  
  //   debugger
  //   return new Array(endPage - startPage + 1).fill(0)
  //     .map((_, index) => startPage + index);
  // }

  // dong(){
  //   this.dangThemSua = false;
  //   this.loadUnsubmittedReports();
  // }

   //Nộp báo cáo
   //submitReport(id : number) {
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
  //}

//   onFileUpload(event: any, reportId: number) {
//     if (!event.target.files || event.target.files.length === 0) {
//         console.error('No file selected');
//         return;
//     }

//     const file: File = event.target.files[0];
//     const validExtensions = ['.doc', '.docx'];
//     const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

//     if (!validExtensions.includes(fileExtension)) {
//         console.error('Invalid file type. Please upload a .doc or .docx file.');
//         return;
//     }

//     this.submissionService.uploadFileWord(reportId, file).subscribe({
//         next: (response) => {
//           debugger
//             console.log('Upload successful', response);
//         },
//         error: (error) => {
//             console.error('Upload failed', error);
//             //alert('File upload failed. Please try again.');
//         },
//     });
// }
}
