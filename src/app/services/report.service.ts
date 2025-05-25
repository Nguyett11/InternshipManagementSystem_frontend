import { Injectable } from "@angular/core";
import { map, Observable } from 'rxjs';
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { report } from "../models/report";

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  private apiReport = `${environment.apiBaseUrl}/Reports`;

  constructor(private http: HttpClient) { }

  addReport(report: report): Observable<report> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<report>(this.apiReport, report, { headers });
  }

  getAllReports(): Observable<report[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<report[]>(this.apiReport, { headers });
  }

  getUnsubmittedReports(studentCode: number): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('studentCode', studentCode.toString());
    return this.http.get<any[]>(`${this.apiReport}/ByUnsubmitted`, { params ,headers});
  }

  getReportById(id: number): Observable<report> {
      const token = localStorage.getItem('token'); 
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.get<report>(`${this.apiReport}/${id}`, { headers });
    }

  searchUnsubmittedReports(studentCode: number, searchTerm: string): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams()
        .set('studentCode', studentCode.toString())
        .set('searchTerm', searchTerm);
  
    return this.http.get<any>(`${this.apiReport}/SearchUnsubmittedReports`, { params , headers });
  }


  getReportsByLecturerId(lecturerId: number): Observable<report[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<report[]>(`${this.apiReport}/ByLecturer/${lecturerId}`, { headers });
  }

  searchReportsByLecturer(lecturerId: number, searchTerm?: string): Observable<any> {
    let params = new HttpParams().set('lecturerId', lecturerId.toString());

    if (searchTerm && searchTerm.trim() !== '') {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get(`${this.apiReport}/SearchByLecturer`, { params });
  }

  updateReport(id: number, body: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiReport}/${id}`;
    return this.http.put<any>(url, body, { headers });
  }

  getReportsByLecturer(keyword: string, page: number, limit: number
  ): Observable<any> {
    const params = {
      keyword: keyword,
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<Report[]>(`${this.apiReport}/by-lecturer`, { params })
  }
}
