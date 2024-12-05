import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostVoteService {

  constructor(private readonly httpClient: HttpClient) {

  }

  upvotePost(postId: number) {
    return this.httpClient.post(`${environment.apiUrl}/posts/upvote/${postId}`, {});
  }

  downvotePost(postId: number) {
    return this.httpClient.post(`${environment.apiUrl}/posts/downvote/${postId}`, {});
  }
}
