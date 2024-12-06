import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { PostEditModel } from '../models/post-edit-model';
import { PostCreateModel } from '../../features/create-post/models/post-create-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private readonly httpClient: HttpClient) {

  }

  createPost(postCreateModel: PostCreateModel) {
    return this.httpClient.post<number>(`${environment.apiUrl}/posts/create`, postCreateModel);
  }

  updatePost(postEditModel: PostEditModel) {
    return this.httpClient.put(`${environment.apiUrl}/posts/update/${postEditModel.id}`, postEditModel);
  }

  deletePost(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/posts/delete/${id}`);
  }
}
