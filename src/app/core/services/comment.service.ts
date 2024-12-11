import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { CommentCreateModel } from '../models/comments/comment-create-model';
import { CommentEditModel } from '../models/comments/comment-edit-model';
import { CommentListModel } from '../models/comments/comment-list-model';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private readonly httpClient: HttpClient) {

  }

  getPostComments(postId: number) {
    return this.httpClient.get<CommentListModel[]>(`${environment.apiUrl}/comments/post-comments/${postId}`);
  }

  createComment(commentCreateModel: CommentCreateModel) {
    return this.httpClient.post<number>(`${environment.apiUrl}/comments/create`, commentCreateModel);
  }

  updateComment(commentEditModel: CommentEditModel) {
    return this.httpClient.put(`${environment.apiUrl}/comments/update/${commentEditModel.id}`, { text: commentEditModel.text });
  }

  deleteComment(deletedCommentId: number) {
    return this.httpClient.delete(`${environment.apiUrl}/comments/delete/${deletedCommentId}`);
  }
}
