import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { PostEditModel } from '../models/posts/post-edit-model';
import { PostCreateModel } from '../models/posts/post-create-model';
import { PostListModel } from '../models/posts/post-list-model';
import { PostsQueryModel } from '../models/posts/posts-query-model';
import { PostDetailsModel } from '../models/posts/post-details-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private readonly httpClient: HttpClient) {

  }

  getPosts(postsQueryModel: PostsQueryModel) {
    return this.httpClient.post<PostListModel[]>(`${environment.apiUrl}/posts/get-home-posts`, postsQueryModel);
  }

  getPostsFromSubforum(subforumId: number, postsQueryModel: PostsQueryModel) {
    return this.httpClient.post<PostListModel[]>(`${environment.apiUrl}/posts/get-subforum-posts/${subforumId}`, postsQueryModel);
  }

  getPostDetailsById(id: string){
    return this.httpClient.get<PostDetailsModel>(`${environment.apiUrl}/posts/details/${id}`);
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
