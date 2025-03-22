import { Component } from '@angular/core';
import { Submission } from '../../../models/submission';
import { environment } from '../../../environments/environment';
import { Grading } from '../../../models/grading';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmissionService } from '../../../services/submission.service';
import { GradingService } from '../../../services/grading.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-detail-report-student',
  standalone: true,
  imports: [FormsModule,
        CommonModule],
  templateUrl: './detail-report-student.component.html',
  styleUrl: './detail-report-student.component.css'
})
export class DetailReportStudentComponent {
  submissions: Submission[] = [];
    submissionId:number = 0; 
    studentCode: number = 0;
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
        this.studentCode = Number(this.route.snapshot.paramMap.get('studentCode'));
        this.currentPage = Number(this.localStorage?.getItem('currentStudentPage')) || 0; 
        this.getSubmissionsByStudent(this.studentCode ,this.keyword, this.currentPage, this.itemsPerPage);
      }
  
      getSubmissionsByStudent(reportId: number, keyword: string, page: number, limit: number){
        this.submissionService.getSubmissionByStudent(this.studentCode , keyword, page, limit).subscribe({
          next: (response: any) => {
            console.log(response);
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
        this.getSubmissionsByStudent(this.studentCode,this.keyword, this.currentPage, this.itemsPerPage);
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
        this.getSubmissionsByStudent(this.studentCode ,this.keyword, this.currentPage, this.itemsPerPage);
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
            this.getSubmissionsByStudent(this.studentCode, this.keyword, this.currentPage, this.itemsPerPage);
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
