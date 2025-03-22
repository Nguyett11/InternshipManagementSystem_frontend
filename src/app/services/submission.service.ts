import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Submission } from "../models/submission";

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

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
