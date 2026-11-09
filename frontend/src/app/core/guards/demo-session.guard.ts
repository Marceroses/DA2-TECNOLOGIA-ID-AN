import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const demoSessionGuard: CanActivateFn = () => {
  if (inject(AuthService).signedIn()) {
    return true;
  }

  return inject(Router).createUrlTree(['/catalog'], {
    queryParams: { acceso: 'denegado' },
  });
};
