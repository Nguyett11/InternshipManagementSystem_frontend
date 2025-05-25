import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { Company } from "../models/company";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private api = `${environment.apiBaseUrl}/Companies`;

  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable<Company[]> {
    const token = localStorage.getItem('token'); // Lấy token JWT từ localStorage hoặc sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Company[]>(this.api, { headers });
  }

  getCompanyById(id: number): Observable<Company> {
    const token = localStorage.getItem('token'); // Lấy token JWT từ localStorage hoặc sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Company>(`${this.api}/${id}`, { headers });
  }

  searchCompaniesByName(name: string): Observable<any[]> {
    const token = localStorage.getItem('token'); // Lấy JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any[]>(`${this.api}/search`, {
      headers,
      params: { name }
    });
  }
}
