import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { Company } from "../models/company";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private api = `${environment.apiBaseUrl}/companies`;

  constructor(private http: HttpClient) { }

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