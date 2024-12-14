import { ResolveFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { UserDetailsModel } from '../models/users/user-details-model';

export const userDetailsResolver: ResolveFn<Observable<UserDetailsModel | null>> = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const username = route.paramMap.get('username');
  return userService.getUserDetails(username!).pipe(catchError(error => {
    router.navigate(['/not-found']);
    return of(null);
  }));
};
