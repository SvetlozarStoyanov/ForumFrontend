import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentReplyVoteService {

  constructor(private readonly httpClient : HttpClient) { 

  }

  upvoteCommentReply(commentReplyId: number) {
    return this.httpClient.post(`${environment.apiUrl}/commentReplies/upvote/${commentReplyId}`, {});
  }

  downvoteCommentReply(commentReplyId: number) {
    return this.httpClient.post(`${environment.apiUrl}/commentReplies/downvote/${commentReplyId}`, {});
  }
}
