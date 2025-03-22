import { HttpClient, HttpParams } from "@angular/common/http";
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

  getMentors( keyword: string, page: number, limit: number
  ): Observable<Mentor[]> {
    const params = {
      keyword: keyword,
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<Mentor[]>(this.api, { params });
  }
  getDetailMentor(id: number): Observable<Mentor> {
    return this.http.get<Mentor>(`${this.api}/${id}`);
  }
  insertMentor(body: any): Observable<any> {
    console.log(body);
    return this.http.post(`http://localhost:8080/api/mentors`, body).pipe(
      tap(response => console.log("Response from server:", response)) // Log phản hồi từ server
    );
  }
  updateMentor(id: number, body: any): Observable<any> {
    const url = `${this.api}/${id}`;
    return this.http.put<any>(url, body);
  }
  getMentorByToken(): Observable<any> {
    return this.http.get<any>(`${this.api}/by-token`).pipe(
      tap(response => console.log("Mentor info from token:", response)) // Log phản hồi từ server
    );
  }
}