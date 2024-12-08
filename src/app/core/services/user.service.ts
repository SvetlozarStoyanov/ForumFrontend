import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) {

  }

  getAllUsernames(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.apiUrl}/users/all-usernames`);
  }
}
