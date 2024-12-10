import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { SubforumCreateModel } from '../../features/create-subforum/models/subforum-create-model';
import { SubforumDetailsModel } from '../models/subforum-details-model';

@Injectable({
  providedIn: 'root'
})
export class SubforumService {

  constructor(private readonly httpClient: HttpClient) {

  }

  getAllSubforumNames(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.apiUrl}/subforums/all-names`);
  }



  createSubforum(subforumCreateModel: SubforumCreateModel): Observable<{ name: string }> {
    return this.httpClient.post<{ name: string }>(`${environment.apiUrl}/subforums/create`, subforumCreateModel);
  }

  joinSubforum(subforumId: number) {
    return this.httpClient.post(`${environment.apiUrl}/subforums/join/${subforumId}`, {});
  }

  leaveSubforum(subforumId: number) {
    return this.httpClient.post(`${environment.apiUrl}/subforums/leave/${subforumId}`, {});
  }

  getSubforumByName(name: string) {
    return this.httpClient.get<SubforumDetailsModel>(`${environment.apiUrl}/subforums/${name}`);
  }
}
