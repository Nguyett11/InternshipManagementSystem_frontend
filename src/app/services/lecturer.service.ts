import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Lecturer } from "../models/lecturer";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LecturerService {
    private api = `${environment.apiBaseUrl}/Lecturers`;

  constructor(private http: HttpClient) { }

  getAllLecturers(): Observable<Lecturer[]> {
    const token = localStorage.getItem('token'); // Lấy token JWT từ localStorage hoặc sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Lecturer[]>(this.api , { headers });
  }

  getLecturerById(id: number): Observable<Lecturer> {
    const token = localStorage.getItem('token'); // Lấy token JWT từ localStorage hoặc sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Lecturer>(`${this.api}/${id}`, { headers });
  }

  searchLecturersByName(name: string): Observable<any[]> {
    const token = localStorage.getItem('token'); // Lấy JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any[]>(`${this.api}/search`, {
      headers,
      params: { name }
    });
  }

  getLecturerByUserId(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Giả sử bạn lưu token trong localStorage
    });

    return this.http.get(`${this.api}/ByUserId/${userId}`, { headers });
  }

  updateLecturer(id: number, body: any): Observable<any> {
    const token = localStorage.getItem('token'); // Lấy token JWT từ localStorage hoặc sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.api}/${id}`;
    return this.http.put<any>(url, body, { headers });
  }

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
  // updateLecturer(id: number, body: any): Observable<any> {
  //   const url = `${this.api}/${id}`;
  //   return this.http.put<any>(url, body);
  // }
  // Thêm phương thức lấy thông tin lecturer bằng token
  getLecturerByToken(): Observable<any> {
    return this.http.get<any>(`${this.api}/by-token`).pipe(
      tap(response => console.log("Lecturer info from token:", response)) // Log phản hồi từ server
    );
  }
}