import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const homeResolver: ResolveFn<boolean> = (route, state) => {
  const authService = inject(AuthService);


  return authService.isAuthenticated();
};
