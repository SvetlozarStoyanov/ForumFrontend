import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostListModel } from '../models/post-list-model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostListService {

  constructor(private readonly httpClient: HttpClient) {

  }

  getPosts() {
    return this.httpClient.get<PostListModel[]>(`${environment.apiUrl}/posts/get-guest-user-posts`);
  }
}
