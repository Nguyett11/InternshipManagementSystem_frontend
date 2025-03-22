import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { InsertGradingDTO } from "../dtos/insert.grading.dto";
import { GradingDTO } from "../dtos/grading/GradingDTO";

@Injectable({
  providedIn: 'root'
})
export class GradingService{
    private apiBaseUrl = `${environment.apiBaseUrl}/gradings`;
    
    constructor(private http: HttpClient) { }
    
    insertGrading(submissionId: number,insertGrading: InsertGradingDTO): Observable<any> {
        return this.http.post(`${this.apiBaseUrl}/${submissionId}`, insertGrading);
      }

    // Phương thức để lấy chấm điểm theo submissionId
    getGrading(submissionId: number): Observable<any> {
      debugger
      return this.http.get<any>(`${this.apiBaseUrl}/${submissionId}`);
    }
}