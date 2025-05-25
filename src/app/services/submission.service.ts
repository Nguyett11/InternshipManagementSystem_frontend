import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Submission } from "../models/submission";

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getSubmissionByIdReport(id: number): Observable<Submission> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Submission>(`${this.apiBaseUrl}/Submissions/${id}`, { headers });
  }

  getSubmissionById(id: number): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiBaseUrl}/Submissions/${id}`, { headers });
  }

  getSubmissionsByReportIdAndStudentCode(reportId: number, studentCode: number): Observable<any> {
    const token = localStorage.getItem('token'); // Lấy token JWT từ localStorage hoặc sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams()
      .set('reportId', reportId.toString())
      .set('studentCode', studentCode.toString());

    return this.http.get(`${this.apiBaseUrl}/ByReportIdAndStudentCode`, { params ,  headers });
  }

  uploadSubmission(reportId: number, studentCode: number, file: File) {
    const formData = new FormData();
    formData.append('reportId', reportId.toString());
    formData.append('studentCode', studentCode.toString());
    formData.append('file', file);

    const token = localStorage.getItem('token'); // Lấy token JWT từ localStorage hoặc sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiBaseUrl}/Submissions`, formData, { headers });
  }

  uploadFileWord(reportId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); 
    return this.http.post(`${this.apiBaseUrl}/submissions/${reportId}`, formData);
  }
}
