import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { PostEditModel } from '../models/post-edit-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private readonly httpClient: HttpClient) {

  }

  updatePost(postEditModel: PostEditModel) {
    return this.httpClient.put(`${environment.apiUrl}/posts/update/${postEditModel.id}`, postEditModel);
  }

  deletePost(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/posts/delete/${id}`);
  }
}
