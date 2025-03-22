import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ReportService {
    private apiReport = `${environment.apiBaseUrl}/reports`;

    constructor(private http: HttpClient) {}

    insertReport(insertReportDTO: any): Observable<any> {
        return this.http.post(`${this.apiReport}`, insertReportDTO);
    }

    getReportsByLecturer( keyword: string, page: number, limit: number
    ): Observable<any>{
      const params = {
        keyword: keyword,
        page: page.toString(),
        limit: limit.toString()
      };
      return this.http.get<Report[]>(`${this.apiReport}/by-lecturer`, { params })
    }

    getReportsByStudentCode( keyword: string, page: number, limit: number
    ): Observable<any>{
      debugger
      const params = {
        keyword: keyword,
        page: page.toString(),
        limit: limit.toString()
      };
      return this.http.get<Report[]>(`${this.apiReport}/by-student`, { params })
    }
}