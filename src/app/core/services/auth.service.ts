import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { LoginModel } from '../models/login-model';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { UserShortInfoModel } from '../models/user-short-info-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatus.asObservable();

  constructor(private httpClient: HttpClient) {
    this.checkAuthStatus().subscribe();
  }

  login(loginModel: LoginModel) {
    return this.httpClient.post<UserShortInfoModel>(`${environment.apiUrl}/users/login`, loginModel).pipe(
      map(res => {

        return res;
      }),
      catchError(error => {

        return of(null);
      })
    );
  }

  logout() {


  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus$;;
  }

  private checkAuthStatus(): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users/get-info`, {}).pipe(
      map((response: any) => {
        console.log('From Service', !!response)
        this.authStatus.next(!!response);
        return response;
      }),
      catchError(() => {
        this.authStatus.next(false); // Default to logged out on error
        return of(null);
      })
    );
  }
}
