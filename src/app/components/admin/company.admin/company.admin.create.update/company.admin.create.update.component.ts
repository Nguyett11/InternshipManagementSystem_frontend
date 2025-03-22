import { Component, Input } from '@angular/core';
import { Company } from '../../../../models/company';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'app-company-admin-create-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './company.admin.create.update.component.html',
  styleUrl: './company.admin.create.update.component.css'
})
export class CompanyAdminCreateUpdateComponent {
  @Input() company : Company;
  id : number;
  company_name : string;
  address : string;
  contact_person : string;
  email : string;
  phone_number : string;

 constructor( private companyService : CompanyService
  ) { }

  ngOnInit(): void {
    if (this.company) {
      this.id = this.company.id;
      this.company_name = this.company.company_name;
      this.address = this.company.address;
      this.contact_person = this.company.contact_person;
      this.email = this.company.email;
      this.phone_number = this.company.phone_number;
    }

  }

  //Tạo sinh viên
  createCompany() {
    var val = {
      company_name : this.company_name,
      address : this.address,
      contact_person: this.contact_person,
      email : this.email,
      phone_number: this.phone_number
    }
    this.companyService.insertCompany(val).subscribe({  
      next: (response: any) => {
        console.log(val);
        alert("Thêm thông tin công ty thành công.");
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log(error);
        alert("Thêm thông tin công ty thất bại");
      }
    });
  }
  updateCompany(company: Company){
      var val = {
        id : this.id,
        company_name : this.company_name,
        address : this.address,
        contact_person: this.contact_person,
        email : this.email,
        phone_number: this.phone_number
      }
      this.companyService.updateCompany(company.id, val).subscribe({
        next: (response: any) => {
          alert("Cập nhật thông tin công ty thành công.");
        },
        complete: () => {
        },
        error: (error: any) => {
          console.log(error);
          alert("Cập nhật thông tin công ty thất bại.");
        }
      });
    }
}
