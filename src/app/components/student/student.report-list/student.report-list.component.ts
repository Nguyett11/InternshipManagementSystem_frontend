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
}
  
