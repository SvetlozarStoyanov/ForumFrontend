import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environment/environment';
import { SubforumCreateModel } from '../models/subforums/subforum-create-model';
import { SubforumDetailsModel } from '../models/subforums/subforum-details-model';
import { SubforumDropdownModel } from '../models/subforums/subforum-dropdown-model';
import { SubforumsQueryModel } from '../models/subforums/subforums-query-model';
import { SubforumListModel } from '../models/subforums/subforum-list-model';
import { SubforumSearchModel } from '../models/subforums/subforum-search-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SubforumService {

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) {

  }

  getGuestSubforums(subforumsQueryModel: SubforumsQueryModel) {
    return this.httpClient.post<SubforumListModel[]>(`${environment.apiUrl}/subforums/get-guest-user-subforums`, subforumsQueryModel);
  }

  getUnjoinedSubforums(subforumsQueryModel: SubforumsQueryModel) {
    return this.httpClient.post<SubforumListModel[]>(`${environment.apiUrl}/subforums/get-user-unjoined-subforums`, subforumsQueryModel);
  }

  getJoinedSubforums(subforumsQueryModel: SubforumsQueryModel) {
    return this.httpClient.post<SubforumListModel[]>(`${environment.apiUrl}/subforums/get-user-joined-subforums`, subforumsQueryModel);
  }

  getAllSubforumNames(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.apiUrl}/subforums/all-names`);
  }

  getSubforumsForDropdown(): Observable<SubforumDropdownModel[]> {
    return this.httpClient.get<SubforumDropdownModel[]>(`${environment.apiUrl}/subforums/all-for-dropdown`);
  }

  searchSubforums(searchTerm: string) {
    return this.httpClient.get<SubforumSearchModel[]>(`${environment.apiUrl}/subforums/search/${searchTerm}`);
  }

  getSubforumByName(name: string) {
    return this.httpClient.get<SubforumDetailsModel>(`${environment.apiUrl}/subforums/${name}`);
  }

  createSubforum(subforumCreateModel: SubforumCreateModel): Observable<{ name: string }> {
    return this.httpClient.post<{ name: string }>(`${environment.apiUrl}/subforums/create`, subforumCreateModel);
  }

  joinSubforum(subforumId: number) {
    return this.httpClient.post(`${environment.apiUrl}/subforums/join/${subforumId}`, {})
      .pipe(catchError(error => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return of(null)
      }));;
  }

  leaveSubforum(subforumId: number) {
    return this.httpClient.post(`${environment.apiUrl}/subforums/leave/${subforumId}`, {});
  }

}
