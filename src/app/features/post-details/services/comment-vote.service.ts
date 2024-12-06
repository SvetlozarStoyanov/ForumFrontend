import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentVoteService {

  constructor(private readonly httpClient: HttpClient) {

  }

  upvoteComment(commentId: number) {
    return this.httpClient.post(`${environment.apiUrl}/comments/upvote/${commentId}`, {});
  }

  downvoteComment(commentId: number) {
    return this.httpClient.post(`${environment.apiUrl}/comments/downvote/${commentId}`, {});
  }
}
