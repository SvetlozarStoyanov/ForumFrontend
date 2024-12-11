import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentReplyCreateModel } from '../models/comment-replies/comment-reply-create-model';
import { environment } from '../../../environment/environment';
import { CommentReplyEditModel } from '../models/comment-replies/comment-reply-edit-model';

@Injectable({
  providedIn: 'root'
})
export class CommentReplyService {


  constructor(private readonly httpClient: HttpClient) {

  }

  createCommentReply(commentReplyCreateModel: CommentReplyCreateModel): Observable<number> {
    return this.httpClient.post<number>(`${environment.apiUrl}/commentReplies/create`, commentReplyCreateModel);
  }

  updateCommentReply(commentReplyEditModel: CommentReplyEditModel) {
    return this.httpClient.put(`${environment.apiUrl}/commentReplies/update/${commentReplyEditModel.id}`, commentReplyEditModel);
  }
  
  deleteCommentReply(replyId: number) {
    return this.httpClient.delete<number>(`${environment.apiUrl}/commentReplies/delete/${replyId}`);
  }
  
}
