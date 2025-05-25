import { Component } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-student.company',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.company.component.html',
  styleUrl: './student.company.component.css'
})
export class StudentCompanyComponent {
    companyList : Company[];
    searchTerm: string = '';
    errorMessage: string = '';
    reportList : Report[];

  constructor( private companyService : CompanyService
    ) { }
  
    ngOnInit(): void {
      this.getAllCompanies();
    }
  
    getAllCompanies(){
      this.companyService.getAllCompanies().subscribe({
        next: (data) => {
          this.companyList = data; 
          console.log(this.companyList);
        },
        error: (err) => {
          console.error('Lỗi lấy danh sách công ty:', err);
        }
      });
    }

    search(): void {
      const trimmedName = this.searchTerm.trim();
      if (!trimmedName) {
        this.getAllCompanies();
        return;
      }
    
      // Nếu có tên cần tìm
      this.companyService.searchCompaniesByName(trimmedName).subscribe({
        next: (data) => {
          this.companyList = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Không tìm thấy công ty';
          this.companyList = [];
        }
      });
    }
}
