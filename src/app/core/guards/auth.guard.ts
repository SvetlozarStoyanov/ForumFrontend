import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);

  const isAuthenticated = authService.isAuthenticated()
  if (!isAuthenticated) {
    const router = inject(Router);
    router.navigate(['/home']);
    return false;
  }
  return true;
};
