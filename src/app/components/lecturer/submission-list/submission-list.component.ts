import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common'; 
import { Submission } from '../../../models/submission'; 
import { SubmissionService } from '../../../services/submission.service'; 
import { Grading } from '../../../models/grading'; 
import { GradingService } from '../../../services/grading.service';

declare var bootstrap: any;

@Component({
  selector: 'app-submission-list',
  standalone: true,
  imports: [ FormsModule,
      CommonModule],
  templateUrl: './submission-list.component.html',
  styleUrl: './submission-list.component.css'
})
export class SubmissionListComponent {
  submissions: Submission[] = [];
  submissionId:number = 0; 
  reportId: number = 0;
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  keyword:string = "";
  visiblePages: number[] = [];
  localStorage?: Storage;
  apiBaseUrl = environment.apiBaseUrl;
  dangThemSua : boolean;
  grade : string;
  feedback : string;
  selectedSubmission: Submission | null = null;
  grading: Grading = { grade: '', feedback: '' }; // Khởi tạo với giá trị mặc định

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private submissionService: SubmissionService,
    private gradingService: GradingService,
    private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
      debugger
      this.reportId = Number(this.route.snapshot.paramMap.get('id'));
      this.currentPage = Number(this.localStorage?.getItem('currentStudentPage')) || 0; 
      this.getSubmissionsByReport(this.reportId ,this.keyword, this.currentPage, this.itemsPerPage);
    }

    getSubmissionsByReport(reportId: number, keyword: string, page: number, limit: number){
      this.submissionService.getSubmissionByReport(this.reportId , keyword, page, limit).subscribe({
        next: (response: any) => {
          debugger
          this.submissions = response.submissions;
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

    // Tải file từ server
  downloadFile(fileName: string): void {
    this.submissionService.downloadFile(fileName).subscribe({
      next: (blob: Blob) => {
        // Tạo URL tạm thời để tải file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Tên file khi tải về
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading file:', error);
      },
    });
  }

    onPageChange(page: number) {
      debugger;
      this.currentPage = page < 0 ? 0 : page;
      this.localStorage?.setItem('currentStudentPage', String(this.currentPage)); 
      this.getSubmissionsByReport(this.reportId,this.keyword, this.currentPage, this.itemsPerPage);
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

    trackById(index: number, submission: Submission): number {
      return submission.id;
    }
    addDiem(selectedSubmission: Submission): void {
      this.selectedSubmission = selectedSubmission; // Lưu submission hiện tại
      this.grading = {
        grade: '',
        feedback: ''
      };
      this.dangThemSua = true;
    }    
  
    dong() {
      this.dangThemSua = false;
      this.getSubmissionsByReport(this.reportId ,this.keyword, this.currentPage, this.itemsPerPage);
  }
  
    submit(submissionId: number): void {
      if (!submissionId) {
        console.error('No submission selected.');
        return;
      }
      this.gradingService.insertGrading(submissionId, {
        grade: this.grade,
        feedback: this.feedback
      }).subscribe({
        next: () => {
          console.log(submissionId);
          alert('Grading submitted successfully');
          this.dangThemSua = false; // Đóng modal
          this.getSubmissionsByReport(this.reportId, this.keyword, this.currentPage, this.itemsPerPage);
        },
        error: (err) => {
          console.error('Error submitting grading:', err);
        }
      });
    }   
    getDiem(submissionId: number) {
      this.gradingService.getGrading(submissionId).subscribe({
          next: (response) => {
              this.grading = response.data; // Gán dữ liệu
              console.log('Lấy điểm thành công:', this.grading);
  
              // Hiển thị modal
              const modalElement = document.getElementById('viewGradeModal');
              if (modalElement) {
                  const modal = new bootstrap.Modal(modalElement);
                  modal.show();
  
                  // Xử lý khi đóng modal
                  modalElement.addEventListener('hidden.bs.modal', () => {
                      document.querySelector('.modal-backdrop')?.remove(); 
                  });
              }
          },
          error: (err) => {
              console.error('Lỗi khi lấy điểm:', err);
          }
      });
  }
}
