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
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Lecturer[]>(this.api , { headers });
  }

  getLecturerById(id: number): Observable<Lecturer> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Lecturer>(`${this.api}/${id}`, { headers });
  }

  searchLecturersByName(name: string): Observable<any[]> {
    const token = localStorage.getItem('token'); 
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
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    });

    return this.http.get(`${this.api}/ByUserId/${userId}`, { headers });
  }

  updateLecturer(id: number, body: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.api}/${id}`;
    return this.http.put<any>(url, body, { headers });
  }
}
