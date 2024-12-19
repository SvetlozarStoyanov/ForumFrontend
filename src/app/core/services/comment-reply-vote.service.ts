import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommentReplyVoteService {

  constructor(private readonly httpClient : HttpClient, private readonly router: Router) { 

  }

  upvoteCommentReply(commentReplyId: number) {
    return this.httpClient.post(`${environment.apiUrl}/commentReplies/upvote/${commentReplyId}`, {})
    .pipe(catchError(error => {
            if (error.status === 401) {
              this.router.navigate(['/login']);
            }
            return of(null)
          }));;
  }

  downvoteCommentReply(commentReplyId: number) {
    return this.httpClient.post(`${environment.apiUrl}/commentReplies/downvote/${commentReplyId}`, {})
    .pipe(catchError(error => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
      return of(null)
    }));;
  }
}
