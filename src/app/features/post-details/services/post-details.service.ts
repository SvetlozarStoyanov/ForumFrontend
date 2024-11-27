import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDetailsModel } from '../models/post-details-model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {

  constructor(private readonly httpClient: HttpClient) { 

  }

  getPostDetailsById(id: string){
    return this.httpClient.get<PostDetailsModel>(`${environment.apiUrl}/posts/details/${id}`);
  }
}
