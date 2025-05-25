import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { Student } from "../models/student";
import { Injectable } from "@angular/core";
import { MentorOfStudent } from "../models/mentor-of-student";
import { LecturerOfStudent } from "../models/lecturer-of-student";
import { Lecturer } from "../models/lecturer";

@Injectable({
  providedIn: 'root'
})

export class StudentService {
    private apiGetStudents = `${environment.apiBaseUrl}/Students`;

  constructor(private http: HttpClient) { }

  getStudents( keyword: string, page: number, limit: number
  ): Observable<Student[]> {
    const params = {
      keyword: keyword,
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<Student[]>(this.apiGetStudents, { params });
  }

  getStudentById(id: number): Observable<Student> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Student>(`${this.apiGetStudents}/${id}`, { headers });
  }

  getStudentByStudentCode(id: number): Observable<Student> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Student>(`${this.apiGetStudents}/ByStudentCode/${id}`, { headers });
  }

  updateStudent(id: number, body: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiGetStudents}/${id}`;
    return this.http.put<any>(url, body, { headers });
  }

  getStudentsByLecturerId(lecturerId: number): Observable<Student[]> {
    const token = localStorage.getItem('token'); // Lấy token JWT từ localStorage hoặc sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Student[]>(`${this.apiGetStudents}/ByLecturerId/${lecturerId}`, { headers });
  }

  searchStudentsByName(name: string): Observable<any[]> {
    const token = localStorage.getItem('token'); // Lấy JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any[]>(`${this.apiGetStudents}/search`, {
      headers,
      params: { name }
    });
  }

  getStudentsByLecturer(keyword: string): Observable<Student[]> {
    debugger
    const params = { keyword: keyword };
    return this.http.get<Student[]>(`${this.apiGetStudents}/by-lecturer`, { params });
  }
  
  getStudentsByMentor(keyword: string): Observable<Student[]> {
    debugger
    const params = { keyword: keyword };
    return this.http.get<Student[]>(`${this.apiGetStudents}/by-mentor`, { params });
  }

  getDetailStudent(studentCode: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiGetStudents}/${studentCode}`);
  } 

  getDetailStudentByToken(): Observable<Student> {
    return this.http.get<Student>(`${this.apiGetStudents}/by-token`);
  }

  getDetailLecturerByToken(): Observable<any> {
    return this.http.get<any>(`${this.apiGetStudents}/lecturer`);
  }

  getDetailMentorByToken(): Observable<any> {
    return this.http.get<any>(`${this.apiGetStudents}/mentor`);
  }

  insertStudent(body: any): Observable<any> {
    console.log(body);
    return this.http.post(`${this.apiGetStudents}`, body);
  }

  getMentorOfStudent(): Observable<MentorOfStudent> {
    return this.http.get<MentorOfStudent>(`${this.apiGetStudents}/mentor`);
  }

  getLecturerOfStudent(keyword: string): Observable<LecturerOfStudent> {
    return this.http.get<LecturerOfStudent>(`${this.apiGetStudents}/lecturer`);
  }  
}
