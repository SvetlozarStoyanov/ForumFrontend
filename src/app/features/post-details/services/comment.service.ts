import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentCreateModel } from '../models/comment-create-model';
import { environment } from '../../../../environment/environment';
import { CommentListModel } from '../models/comment-list-model';

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
    return this.httpClient.post(`${environment.apiUrl}/comments/create`, commentCreateModel);
  }
}
