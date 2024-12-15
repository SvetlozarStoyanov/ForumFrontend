import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { UserDetailsModel } from '../models/users/user-details-model';
import { UserSearchModel } from '../models/users/user-search-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) {

  }

  searchUsers(searchTerm: string) {
    return this.httpClient.get<UserSearchModel[]>(`${environment.apiUrl}/users/search/${searchTerm}`);
  }

  getUserDetails(username: string) {
    return this.httpClient.get<UserDetailsModel>(`${environment.apiUrl}/users/get-user-details/${username}`);
  }

  getAllUsernames(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.apiUrl}/users/all-usernames`);
  }
}
