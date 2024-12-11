import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { SubforumDropdownModel } from '../models/subforums/subforum-dropdown-model';

@Injectable({
  providedIn: 'root'
})
export class SubforumDropdownService {

  constructor(private readonly httpClient: HttpClient) {

  }

  getSubforumsForDropdown(): Observable<SubforumDropdownModel[]> {
    return this.httpClient.get<SubforumDropdownModel[]>(`${environment.apiUrl}/subforums/all-for-dropdown`);
  }
}
