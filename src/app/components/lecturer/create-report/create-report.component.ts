import { Component, OnInit } from '@angular/core';
import { InsertReportDTO } from '../../../dtos/report/insert.report.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../../services/report.service';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.css'
})
export class CreateReportComponent implements OnInit {
  title: string;
  description: string;
  dueDate: Date;
  listStudents: Student[];
  selectedStudents: boolean[] = []; 

  students: Student[] = [];
  keyword: string = "";

  insertReportDTO: InsertReportDTO = {
    title: '',
    description: '',
    due_date: new Date(),
    list_students: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private studentService: StudentService
  ) {
    this.title = '';
    this.description = '';
    this.dueDate = new Date();
    this.listStudents = [];
  }

  ngOnInit(): void {
    this.getStudentsByLecturer(this.keyword);
  }

  getStudentsByLecturer(keyword: string) {
    this.studentService.getStudentsByLecturer(keyword).subscribe({
      next: (response: any) => {
        debugger;
        this.students = response.data;
        console.log('Students:', this.students);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching students:', error);
      }
    });
  }

  searchStudents() {
    debugger;
    this.getStudentsByLecturer(this.keyword);
  }

  updateSelectedStudents() {
    this.listStudents = this.students.filter(student => this.selectedStudents[student.student_code]);
  }

  insertReport() {
    this.updateSelectedStudents(); // Cập nhật danh sách sinh viên đã chọn
  
    const insertReportDTO: InsertReportDTO = {
      title: this.title,
      description: this.description,
      due_date: this.dueDate,
      list_students: this.listStudents.map(student => student.student_code) // Chỉ lấy mã sinh viên
    };
  
    console.log('Insert Report DTO:', insertReportDTO);
  
    this.reportService.insertReport(insertReportDTO).subscribe({
      next: (response: any) => {
        debugger
        const confirmation = window
          .confirm('Tạo báo cáo thành công.');
        if (confirmation) {
          this.router.navigate(['/lecturer']);
        }
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {        
        debugger  
        alert(error?.error?.message ?? '')          
      }
    });
  }
}
