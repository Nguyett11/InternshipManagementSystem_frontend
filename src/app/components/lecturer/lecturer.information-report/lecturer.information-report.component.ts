declare var bootstrap: any;

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../../services/report.service';
import { report } from '../../../models/report';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportsStudentsService } from '../../../services/reportsStudent.service';
import { GradingService } from '../../../services/grading.service';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student';
import { SubmissionService } from '../../../services/submission.service';
import { Submission } from '../../../models/submission';

@Component({
  selector: 'app-infofmation-report',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule,
    CommonModule],
  templateUrl: './lecturer.information-report.component.html',
  styleUrl: './lecturer.information-report.component.css'
})
export class LecturerInfofmationReportComponent {
  reportId!: number;
  report : report;
  students : any;
  searchTerm : string;
  message : string;
  submissionId : number;
  lecturerId : number;
  grade : number;
  feedback : string;
  modal: any;
  gradingId : number;
  student : Student;
  studentCode : number;
  submission : any;

  constructor(private route: ActivatedRoute,
    private reportService : ReportService,
    private reportStudentService : ReportsStudentsService,
    private gradingService : GradingService,
    private studentService : StudentService,
    private submissionService : SubmissionService
  ) {}

  ngOnInit(): void {
    this.reportId = Number(this.route.snapshot.paramMap.get('reportId'));

    this.getReport();
    this.loadStudents();

  }

  getReport(){
    this.reportService.getReportById(this.reportId).subscribe({
    next: (response: any) => { 
      this.report = response.Report;      
    },
    error: (err) => {
      console.error('Lỗi lấy chi tiết báo cáo:', err);
    }
  });
  }

  loadStudents(): void {
    this.reportStudentService.getStudentsByReportId(this.reportId).subscribe({
      next: (data) => {
        this.students = data;
        console.log(this.students);
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách sinh viên:', err);
      }
    });
  }

  search() {
  if (!this.searchTerm || this.searchTerm.trim() === '') {
    this.loadStudents();
    this.message = '';
    return;
  }

  this.reportStudentService.searchStudents(this.reportId, this.searchTerm).subscribe({
    next: (data) => {
      this.students = data;
      this.message = '';
    },
    error: (error) => {
      this.students = [];
      if (error.status === 404) {
        this.message = error.error.message;
      } else {
        this.message = 'Có lỗi xảy ra khi tìm kiếm báo cáo.';
      }
    }
  });
}

// createGrading(submissionId : number, lecturerId : number){
//   this.submissionId = submissionId;
//   this.lecturerId = lecturerId;
//   this.grade = null;
//   this.feedback = '';
// }

// submitGrading() {
//   if (this.grade === null || isNaN(Number(this.grade)) || Number(this.grade) < 0 || Number(this.grade) > 10) {
//     alert('Điểm phải từ 0 đến 10');
//     return;
//   }

//   const grading = {
//     submission_id: this.submissionId,
//     lecturer_id: this.lecturerId,
//     grade: this.grade.toString(),
//     feedback: this.feedback
//   };

//   console.log("Grading: ", grading);

//   this.gradingService.postGrading(grading).subscribe({
//     next: (res) => {
//       alert('Chấm điểm thành công!');
//       this.modal?.hide();
//       this.loadStudents();
//     },
//     error: (err) => {
//       alert('Lỗi khi chấm điểm.');
//       console.error(err);
//     }
//   });
// }

updateGrading(grading: any, submissonId : number, lecturerId : number) {
  if (grading){
  this.gradingId = grading.id;
  this.grade = Number(grading.grade);
  this.feedback = grading.feedback;
  this.submissionId = grading.submission_id;
  this.lecturerId = grading.lecturer_id;
  } else{
    this.submissionId = submissonId;
    this.lecturerId = lecturerId;
  }

  console.log(this.submissionId, this.lecturerId);

  // Mở modal thủ công (nếu không dùng data-bs-toggle)
  const modalEl = document.getElementById('updateGrade');
  if (modalEl) {
    this.modal = new bootstrap.Modal(modalEl);
    this.modal.show();
  }
}

submitGrading() {
  if (this.grade === null || isNaN(Number(this.grade)) || Number(this.grade) < 0 || Number(this.grade) > 10) {
    alert('Điểm phải từ 0 đến 10');
    return;
  }

  const gradingPUT = {
    id: this.gradingId,
    submission_id: this.submissionId,
    lecturer_id: this.lecturerId,
    grade: this.grade.toString(),
    feedback: this.feedback
  };

  const gradingPOST = {
    submission_id: this.submissionId,
    lecturer_id: this.lecturerId,
    grade: this.grade.toString(),
    feedback: this.feedback
  };

  if (this.gradingId) {
    // Cập nhật
    this.gradingService.updateGrading(gradingPUT).subscribe({
      next: () => {
        alert('Cập nhật điểm thành công!');
        this.modal?.hide();
        this.loadStudents();
      },
      error: (err) => {
        alert('Lỗi khi cập nhật điểm.');
        console.error(err);
      }
    });
  } else {
    // Thêm mới
    this.gradingService.postGrading(gradingPOST).subscribe({
      next: () => {
        alert('Chấm điểm thành công!');
        this.modal?.hide();
        this.loadStudents();
      },
      error: (err) => {
        alert('Lỗi khi chấm điểm.');
        console.error(err);
      }
    });
  }
}

xemchitiet(studentCode : number, submissionId : number){
  this.studentCode = studentCode;
  this.submissionId = submissionId;
  this.getStudent();
  this.getSubmission();
}

getStudent(){
this.studentService.getStudentByStudentCode(this.studentCode).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
}

getSubmission(){
this.submissionService.getSubmissionById(this.submissionId).subscribe({
      next: (data) => {
        this.submission = data;      },
      error: (err) => {
        console.error(err);
      }
    });
}

downloadFile(filename: string) {
  const fileUrl = `http://localhost:5216/UploadedFiles/${filename}`;

  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

}
  