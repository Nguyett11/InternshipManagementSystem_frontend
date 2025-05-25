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
  
  

  getCompanies( keyword: string, page: number, limit: number
  ): Observable<Company[]> {
    const params = {
      keyword: keyword,
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<Company[]>(this.api, { params });
  }
  insertCompany(body: any): Observable<any> {
    return this.http.post(this.api, body);
  }
  updateCompany(id: number, body: any): Observable<any> {
    const url = `${this.api}/${id}`;
    return this.http.put<any>(url, body);
  }
  deleteCompany(id: number): Observable<any> {
    const url = `${this.api}/${id}`;
    return this.http.delete<any>(url);
  }
}