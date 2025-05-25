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
    const token = localStorage.getItem('token'); // Lấy token JWT từ localStorage hoặc sessionStorage
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
    // Đặt key là 'file_path' để khớp với @JsonProperty ở backend
    formData.append('file', file); 
    return this.http.post(`${this.apiBaseUrl}/submissions/${reportId}`, formData);
  }

  getSubmissionByReport(
    reportId: number,
    keyword: string,
    page: number,
    limit: number
  ): Observable<Submission[]> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('limit', limit.toString());
      debugger
      console.log(reportId);
    return this.http.get<Submission[]>(`${this.apiBaseUrl}/submissions/${reportId}`, { params });
  }  

  // Tải file từ server
  downloadFile(fileName: string): Observable<Blob> {
    const url = `${this.apiBaseUrl}/submissions/word/${encodeURIComponent(fileName)}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getSubmissionByStudent(
    studentCode: number,
    keyword: string,
    page: number,
    limit: number
  ): Observable<Submission[]> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('limit', limit.toString());
      debugger
      console.log(studentCode);
    return this.http.get<Submission[]>(`${this.apiBaseUrl}/submissions/${studentCode}`, { params });
  } 
}
