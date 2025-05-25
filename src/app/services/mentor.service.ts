import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Mentor } from "../models/mentor";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MentorService {
    private api = `${environment.apiBaseUrl}/mentors`;

  constructor(private http: HttpClient) { }

  getAllMentors(): Observable<Mentor[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Mentor[]>(this.api , { headers });
  }

  getMentorById(id: number): Observable<Mentor> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Mentor>(`${this.api}/${id}`, { headers });
  }

  searchMentorsByName(name: string): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any[]>(`${this.api}/search`, {
      headers,
      params: { name }
    });
  }
}
