import { Component } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { SubmissionService } from '../../../services/submission.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { report } from '../../../models/report';
import { ReportsStudentsService } from '../../../services/reportsStudent.service';
import { StudentService } from '../../../services/student.service';
import { forkJoin } from 'rxjs';
import { Grading } from '../../../models/grading';
import { Submission } from '../../../models/submission';

interface ReportItem {
  Report: report;
  Submission : Submission;
  Grading: Grading | null;
}

@Component({
  selector: 'app-student.report-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './student.report-list.component.html',
  styleUrl: './student.report-list.component.css'
})

export class StudentReportListComponent {
  //reportList: report[];
  //reports : report[];

  reportList: ReportItem[] = [];
  reports: ReportItem[] = [];
  errorMessage : string;
  searchTerm : string;

  constructor( private reportService : ReportService,
    private submissionService : SubmissionService,
    private reportStudentService : ReportsStudentsService,
    private studentService : StudentService
    ) { }
  
    ngOnInit(): void {
    this.getAllReports();

    }
    
    getAllReports() {
      const userId = Number(localStorage.getItem('user_id'));
      this.studentService.getStudentById(userId).subscribe({
        next: (data) => {
          this.reportStudentService.getReportsByStudentCode(data.student_code).subscribe({
            next: (response: any[]) => {
              this.reportList = response;
              console.log(this.reportList);
            }
           });
        },
        error: (error) => {
          console.error('Lỗi khi lấy sinh viên theo ID:', error);
        }
      });
    }

    searchReports() {
    const userId = Number(localStorage.getItem('user_id'));
    this.studentService.getStudentById(userId).subscribe({
      next: (data) => {
        this.reportStudentService.searchReports(data.student_code, this.searchTerm).subscribe(
          (data) => {
            this.reportList = data;
            this.errorMessage = '';
          },
          (error) => {
            this.reportList = [];
            this.errorMessage = 'Không tìm thấy báo cáo nào với từ khóa tìm kiếm này.';
          }
        );      
      },
      error: (error: any) => {
        console.error('Error fetching students:', error);
      }
    });
}
    

    // getAllReports() {
    //   const userId = Number(localStorage.getItem('user_id'));
    //   this.studentService.getStudentById(userId).subscribe({
    //     next: (data) => {
    //       this.reportStudentService.getReportsByStudentCode(data.student_code).subscribe({
    //         next: (response: any) => {
    //           this.reportList = response;
    
    //           const reportRequests = this.reportList.map(report =>
    //             this.reportService.getReportById(report.Report.report_id)
    //           );
    
    //           forkJoin(reportRequests).subscribe({
    //             next: (reportsData : report[]) => {
    //               this.reports = reportsData;
    //               console.log(this.reports); 
    //             },
    //             error: (err) => {
    //               console.error('Lỗi khi lấy chi tiết các báo cáo:', err);
    //             }
    //           });
    //         },
    //         error: (error: any) => {
    //           console.error('Error fetching reports by student code:', error);
    //         }
    //       });
    //     },
    //     error: (error: any) => {
    //       console.error('Error fetching student by ID:', error);
    //     }
    //   });
    // }
    
}


// this.reportService.getAllReports().subscribe({
//   next: (data) => {
//     this.reportList = data;
//     console.log("kk", data);

    // Duyệt qua từng report và lấy thông tin submission theo id_report
    // this.reportList.forEach((report: any) => {
    //   console.log("hh: ", report.id_report);
    //   this.submissionService.getSubmissionByIdReport(report.id_report).subscribe({
    //     next: (submissionData) => {
    //       // Gắn thông tin submission vào report tương ứng
    //       report.submission = submissionData;
    //       console.log(`Submission cho report ${report.id_report}:`, submissionData);
    //     },
    //     error: (err) => {
    //       console.error(`Lỗi lấy submission cho report ${report.id_report}:`, err);
    //     }
    //   });
    // });
//   },
//   error: (err) => {
//     console.error('Lỗi lấy danh sách báo cáo:', err);
//   }
// });