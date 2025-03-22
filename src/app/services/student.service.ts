import { HttpClient, HttpParams } from "@angular/common/http";
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
    private apiGetStudents = `${environment.apiBaseUrl}/students`;

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

  updateStudent(id: number, body: any): Observable<any> {
    const url = `${this.apiGetStudents}/${id}`;
    return this.http.put<any>(url, body);
  }

  getMentorOfStudent(): Observable<MentorOfStudent> {
    return this.http.get<MentorOfStudent>(`${this.apiGetStudents}/mentor`);
  }

  getLecturerOfStudent(keyword: string): Observable<LecturerOfStudent> {
    return this.http.get<LecturerOfStudent>(`${this.apiGetStudents}/lecturer`);
  }

  
}
