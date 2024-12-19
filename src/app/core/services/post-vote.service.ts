import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostVoteService {

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) {

  }

  upvotePost(postId: number) {
    return this.httpClient.post(`${environment.apiUrl}/posts/upvote/${postId}`, {})
      .pipe(catchError(error => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return of(null);
      }));
  }

  downvotePost(postId: number) {
    return this.httpClient.post(`${environment.apiUrl}/posts/downvote/${postId}`, {})
      .pipe(catchError(error => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return of(null)
      }));
  }
}
