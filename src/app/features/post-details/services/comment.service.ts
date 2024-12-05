import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentCreateModel } from '../models/comment-create-model';
import { environment } from '../../../../environment/environment';
import { CommentListModel } from '../models/comment-list-model';
import { CommentEditModel } from '../models/comment-edit-model';

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
