import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { PostEditModel } from '../models/post-edit-model';
import { PostCreateModel } from '../../features/create-post/models/post-create-model';
import { PostListModel } from '../models/post-list-model';
import { PostsQueryModel } from '../models/posts-query-model';

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
