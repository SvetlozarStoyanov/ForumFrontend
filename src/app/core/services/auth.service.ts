import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { LoginModel } from '../models/user-management/login/login-model';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { UserAuthModel } from '../models/user-management/auth/user-auth-model';
import { RegisterModel } from '../models/user-management/register/register-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatus.asObservable();

  constructor(private httpClient: HttpClient) {
    this.syncAuthState();
  }

  getCurrentUser(): UserAuthModel | null {
    let userAsString = localStorage.getItem('user');
    if (!userAsString) {
      return null;
    }
    return JSON.parse(userAsString);
  }

  login(loginModel: LoginModel) {
    return this.httpClient.post<UserAuthModel>(`${environment.apiUrl}/users/login`, loginModel).pipe(
      map(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.authStatus.next(true);
        return res;
      }),
      catchError(error => {

        return of(null);
      })
    );
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<UserAuthModel>(`${environment.apiUrl}/users/register`, registerModel).pipe(
      map(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.authStatus.next(true);
        return res;
      }),
      catchError(error => {

        return of(null);
      })
    );
  }

  logout() {
    return this.httpClient.post(`${environment.apiUrl}/users/logout`, {}).pipe(
      map(res => {
        this.authStatus.next(false);
        localStorage.removeItem('user');
        return res;
      }),
      catchError(error => {

        return of(null);
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }

  private syncAuthState() {
    this.authStatus.next(this.isAuthenticated());
  }

}
