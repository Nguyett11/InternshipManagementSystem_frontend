import { Injectable } from "@angular/core";
import { map, Observable } from 'rxjs';
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { report } from "../models/report";
import { ReportStudent } from "../models/report-student";

@Injectable({
  providedIn: 'root'
})

export class ReportsStudentsService {
  private apiReport = `${environment.apiBaseUrl}/ReportsStudent`;

  constructor(private http: HttpClient) { }

  addReportStudent(reportStudent: ReportStudent): Observable<Report> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Report>(this.apiReport, reportStudent, { headers });
  }

   getReportsByStudentCode(id: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.apiReport}/${id}`, { headers });
  }

  searchReports(studentCode: number, searchTerm: string | null): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    let params = new HttpParams()
      .set('studentCode', studentCode.toString()); 
  
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
  
    return this.http.get(`${this.apiReport}/search`, { params, headers });
  }
  
  getStudentsByReportId(reportId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.apiReport}/report-students/${reportId}`, { headers });
  }

  searchStudents(reportId: number, keyword: string = ''): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let params = new HttpParams()
      .set('reportId', reportId)
      .set('searchTerm', keyword);

    return this.http.get<any[]>(`${this.apiReport}/report-students/search`, { params , headers });
  }
}