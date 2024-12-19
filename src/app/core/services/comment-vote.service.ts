import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentVoteService {

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) {

  }

  upvoteComment(commentId: number) {
    return this.httpClient.post(`${environment.apiUrl}/comments/upvote/${commentId}`, {})
    .pipe(catchError(error => {
            if (error.status === 401) {
              this.router.navigate(['/login']);
            }
            return of(null)
          }));;
  }

  downvoteComment(commentId: number) {
    return this.httpClient.post(`${environment.apiUrl}/comments/downvote/${commentId}`, {})
    .pipe(catchError(error => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
      return of(null)
    }));;
  }
}
