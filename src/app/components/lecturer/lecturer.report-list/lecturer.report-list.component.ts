import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ReportService } from '../../../services/report.service';
import { Router } from '@angular/router';
import { report } from '../../../models/report';
import { UserService } from '../../../services/user.service';
import { LecturerService } from '../../../services/lecturer.service';

interface ReportWithGrading {
  Report: report;
  Grading: any;
}

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './lecturer.report-list.component.html',
  styleUrl: './lecturer.report-list.component.css'
})
export class LecturerReportListComponent implements OnInit{
  reports : report[];
  reportForm: FormGroup;
  isPersonalFormVisible = false;
  message : string;
  searchTerm : string;
  lecturerId : number;
  report : report;

  constructor(
      private reportService: ReportService,
      private router: Router,
      private lecturerService : LecturerService,
      private fb: FormBuilder
    ) {
    // Khởi tạo form
    this.reportForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      due_date: ['', Validators.required],
    });
    }
    ngOnInit(): void {
      const userId = Number(localStorage.getItem('user_id')); 
      this.getLecturer(userId);
    }

    getLecturer(userId: number) {
    this.lecturerService.getLecturerByUserId(userId).subscribe({
      next: (lecturerData) => {
        this.lecturerId = lecturerData.lecturer_id;
        this.reportService.getReportsByLecturerId(lecturerData.lecturer_id).subscribe({
          next: (reportsData) => {
            this.reports = reportsData;
            },
          error: (err) => {
            console.error('Lỗi lấy danh sách báo cáo:', err);
            this.reports = [];
          }
        });
      },
    error: (err) => {
      console.error('Lỗi lấy người dùng:', err);
    }
  });
}


  setReportForm(reportResponse: any) {
  this.reportForm.patchValue({
    title: reportResponse.title,
    description: reportResponse.description,
    due_date: reportResponse.due_date ? reportResponse.due_date.substring(0, 10) :'',
  });
}

  editReport(reportId: number) {
  this.reportService.getReportById(reportId).subscribe({
    next: (response: any) => { 
      this.report = response.Report;
      this.setReportForm(this.report);
      this.showUpdateForm('personal-form');
      
    },
    error: (err) => {
      console.error('Lỗi lấy chi tiết báo cáo:', err);
    }
  });
}


  showUpdateForm(formId: string) {
    if (formId === 'personal-form') {
      this.isPersonalFormVisible = true;
    }
  }

  hideUpdateForm(formId: string) {
    if (formId === 'personal-form') {
      this.isPersonalFormVisible = false;
    }
  }

  search() {
    this.reportService.searchReportsByLecturer(this.lecturerId, this.searchTerm).subscribe({
      next: (data) => {
        this.reports = data;
        this.message = '';
      },
      error: (error) => {
        this.reports = [];
        if (error.status === 404) {
          this.message = error.error.message;
        } else {
          this.message = 'Có lỗi xảy ra khi tìm kiếm báo cáo.';
        }
      }
    });
  }

  submitReport() {  
    // Lấy dữ liệu từ lecturerForm
    const val = {
      report_id: this.report.report_id,
      title: this.reportForm.get('title')?.value,
      description: this.reportForm.get('description')?.value,
      create_date : this.report.create_date,
      due_date: this.reportForm.get('due_date')?.value,
      lecturer_id : this.lecturerId
    };
  
    console.log("Data submitted:", val);
  
    this.reportService.updateLecturer(this.report.report_id, val).subscribe({
      next: (response: any) => {
        alert("Cập nhật thông tin thành công.");
        const userId = Number(localStorage.getItem('user_id'));      
        this.getLecturer(userId);
      },
      error: (error: any) => {
        console.error("Error:", error);
        alert("Cập nhật thông tin thất bại.");
      },
    });
  }

  onClick(reportId : number) {
    this.router.navigate(['lecturer/information-report', reportId]);
  }
}
