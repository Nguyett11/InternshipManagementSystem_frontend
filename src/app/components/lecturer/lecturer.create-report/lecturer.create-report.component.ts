import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { LecturerService } from '../../../services/lecturer.service';
import { CommonModule } from '@angular/common';
import { ReportsStudentsService } from '../../../services/reportsStudent.service';

@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lecturer.create-report.component.html',
  styleUrl: './lecturer.create-report.component.css'
})
export class LecturerCreateReportComponent implements OnInit {
  studentList : Student[];
  searchTerm: string = '';
  errorMessage: string = '';
  //lecturer_id : number;
  selectedStudents: any[] = [];
  reportForm: FormGroup;
  successMessage = '';

  title : string;
  description : string;
  create_date : Date;
  due_date : Date;
  lecturer_id : number;
  
  constructor( 
    private studentService : StudentService,
    private lecturerService : LecturerService,
    private fb: FormBuilder,
    private reportService: ReportService,
    private reportStudentService : ReportsStudentsService
    ) { 
      this.reportForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      create_date: ['', Validators.required],
      due_date: ['', Validators.required],
      lecturer_id: [null, Validators.required]
    });
    }
    
  ngOnInit(): void {
    const userId = Number(localStorage.getItem('user_id')); 
    this.loadStudents(userId);
  }
    
  loadStudents(userId : number): void {
    this.lecturerService.getLecturerByUserId(userId).subscribe({
      next: (data) => {
        this.lecturer_id = data.lecturer_id;
        this.studentService.getStudentsByLecturerId(data.lecturer_id).subscribe({
          next: (data) => {
            this.studentList = data;
            this.errorMessage = '';
          },
          error: (err) => {
            this.studentList = [];
            this.errorMessage = err.error.message || 'Lỗi khi tải danh sách sinh viên.';
            },
          });      
        },
        error: (err) => {
        console.error('Lỗi lấy giảng viên:', err);
      }
    });
  }
  
  search(): void {
    const trimmedName = this.searchTerm.trim();
      if (!trimmedName) {
        const userId = Number(localStorage.getItem('user_id')); 
          this.loadStudents(userId);
          return;
      }
      
      // Nếu có tên cần tìm
      this.studentService.searchStudentsByName(trimmedName).subscribe({
        next: (data) => {
            this.studentList = data;
            this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Không tìm thấy sinh viên';
          this.studentList = [];
        }
      });
    }

  toggleSelection(student: Student) {
    const index = this.selectedStudents.findIndex(s => s.student_code === student.student_code);
    if (index > -1) {
      this.selectedStudents.splice(index, 1);
    } else {
      this.selectedStudents.push(student);
    }
  }
  isSelected(student: Student) {
    return this.selectedStudents.some(s => s.student_code === student.student_code);
  }

createReport() {
  const dueDateObj = new Date(this.due_date);
  const dueDateVietnamTime = new Date(dueDateObj.getTime() + 7 * 60 * 60 * 1000);

  const val: any = {
    title: this.title,
    description: this.description,
    create_date: new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString(),
    due_date: dueDateVietnamTime.toISOString(),  
    lecturer_id: this.lecturer_id
  };

  this.reportService.addReport(val).subscribe({
    next: (createdReport) => {
      // createdReport là dữ liệu báo cáo vừa tạo, có id báo cáo
      const reportId = createdReport.report_id; 

      if (this.selectedStudents.length === 0) {
        alert("Tạo báo cáo thành công, không có sinh viên được chọn.");
        return;
      }

      // Tạo mảng Observable lưu từng reportStudent
      const saveReportStudents$ = this.selectedStudents.map(student => {
        const reportStudent = {
          report_id: reportId,
          student_code: student.student_code  // hoặc student.id tùy cấu trúc
        };
        return this.reportStudentService.addReportStudent(reportStudent);
      });

      // Gọi đồng thời tất cả API lưu reportStudent
      forkJoin(saveReportStudents$).subscribe({
        next: () => alert("Tạo báo cáo và lưu sinh viên thành công."),
        error: (err) => {
          console.error("Lỗi khi lưu reportStudent:", err);
          alert("Tạo báo cáo nhưng lưu sinh viên thất bại.");
        }
      });
    },
    error: (error) => {
      console.error('Lỗi khi tạo báo cáo:', error);
      alert("Tạo báo cáo thất bại");
    }
  });
}

// createReport() {  
//   // due_date là string "YYYY-MM-DDTHH:mm" từ datetime-local
//   const dueDateObj = new Date(this.due_date);

//   // Cộng thêm 7 tiếng để chuyển về UTC+7
//   const dueDateVietnamTime = new Date(dueDateObj.getTime() + 7 * 60 * 60 * 1000);

//   const val: any = {
//     title: this.title,
//     description: this.description,
//     create_date: new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString(),
//     due_date: dueDateVietnamTime.toISOString(),  
//     lecturer_id: this.lecturer_id
//   };

//   console.log('Dữ liệu gửi đi:', val);

//   this.reportService.addReport(val).subscribe({
//     next: () => alert("Tạo báo cáo thành công."),
//     error: (error) => {
//       console.error('Lỗi khi gửi dữ liệu:', error);
//       alert("Tạo báo cáo thất bại");
//     }
//   });
// }
}
