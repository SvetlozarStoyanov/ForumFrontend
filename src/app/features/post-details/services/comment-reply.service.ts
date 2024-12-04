import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentReplyCreateModel } from '../models/comment-reply-create-model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentReplyService {


  constructor(private readonly httpClient: HttpClient) {

  }

  createCommentReply(commentReplyCreateModel: CommentReplyCreateModel): Observable<number> {
    return this.httpClient.post<number>(`${environment.apiUrl}/commentReplies/create`, commentReplyCreateModel);
  }

  deleteCommentReply(replyId: number) {
    return this.httpClient.delete<number>(`${environment.apiUrl}/commentReplies/delete/${replyId}`);
  }
}
