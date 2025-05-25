import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { Comment } from "@angular/compiler"; 
import { Injectable } from "@angular/core";
import { CommentDTO } from "../dtos/comment/comment.dto";

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private api = `${environment.apiBaseUrl}/comments`;

  constructor(private http: HttpClient) { }

  getComments(submissionId: number, userId?: number): Observable<any> {
    let params = new HttpParams().set('submission_id', submissionId);

    if (userId !== undefined && userId !== null) {
      params = params.set('user_id', userId);
    }

    return this.http.get(this.api, { params });
  }

  insertComment(commentDTO: CommentDTO): Observable<any> {
    return this.http.post(this.api, commentDTO);
  }  

}