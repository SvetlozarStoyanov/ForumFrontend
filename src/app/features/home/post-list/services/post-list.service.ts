import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { PostListModel } from '../../../../core/models/post-list-model';

@Injectable({
  providedIn: 'root'
})
export class PostListService {

  constructor(private readonly httpClient: HttpClient) {

  }

  getPosts() {
    return this.httpClient.get<PostListModel[]>(`${environment.apiUrl}/posts/get-home-posts`);
  }
}
