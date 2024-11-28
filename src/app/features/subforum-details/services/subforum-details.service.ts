import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubforumDetailsModel } from '../models/subforum-details-model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SubforumDetailsService {

  constructor(private readonly httpClient: HttpClient) {

  }

  getSubforumByName(name: string) {
    return this.httpClient.get<SubforumDetailsModel>(`${environment.apiUrl}/subforums/details/${name}`);
  }
}
