import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Lecturer } from "../models/lecturer";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LecturerService {
    private api = `${environment.apiBaseUrl}/lecturers`;

  constructor(private http: HttpClient) { }

  getLectures( keyword: string, page: number, limit: number
  ): Observable<Lecturer[]> {
    const params = {
      keyword: keyword,
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<Lecturer[]>(this.api, { params });
  }

  getDetailLecturer(id: number): Observable<Lecturer> {
    return this.http.get<Lecturer>(`${this.api}/${id}`);
  }

  insertLecturer(body: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/lecturers`, body).pipe(
      tap(response => console.log("Response from server:", response)) // Log phản hồi từ server
    );
  }
  updateLecturer(id: number, body: any): Observable<any> {
    const url = `${this.api}/${id}`;
    return this.http.put<any>(url, body);
  }
  // Thêm phương thức lấy thông tin lecturer bằng token
  getLecturerByToken(): Observable<any> {
    return this.http.get<any>(`${this.api}/by-token`).pipe(
      tap(response => console.log("Lecturer info from token:", response)) // Log phản hồi từ server
    );
  }
}