import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { InsertGradingDTO } from "../dtos/insert.grading.dto";
import { GradingDTO } from "../dtos/grading/grading.dto";
import { Grading } from "../models/grading";

@Injectable({
  providedIn: 'root'
})
export class GradingService{
    private apiBaseUrl = `${environment.apiBaseUrl}/Grading`;
    
    constructor(private http: HttpClient) { }

    postGrading(grading: Grading): Observable<any> {
    const token = localStorage.getItem('token'); // Lấy JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiBaseUrl}`, grading, { headers });
    }
    
    insertGrading(submissionId: number,insertGrading: InsertGradingDTO): Observable<any> {
        return this.http.post(`${this.apiBaseUrl}/${submissionId}`, insertGrading);
      }

    // Phương thức để lấy chấm điểm theo submissionId
    getGrading(submissionId: number): Observable<any> {
      debugger
      return this.http.get<any>(`${this.apiBaseUrl}/${submissionId}`);
    }

    updateGrading(body: any): Observable<any> {
      const token = localStorage.getItem('token'); // Lấy token JWT từ localStorage hoặc sessionStorage
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const url = `${this.apiBaseUrl}/${body.id}`;
      return this.http.put<any>(url, body, { headers });
  }

    getGradingById(id: number): Observable<any> {
      const token = localStorage.getItem('token'); // Lấy token JWT từ localStorage hoặc sessionStorage
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.get<any>(`${this.apiBaseUrl}/${id}`, { headers });
    }
}