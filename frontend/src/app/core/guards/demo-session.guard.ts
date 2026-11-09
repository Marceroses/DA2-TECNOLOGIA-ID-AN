import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DemoSession } from '../services/demo-session';

export const demoSessionGuard: CanActivateFn = () => {
  if (inject(DemoSession).signedIn()) {
    return true;
  }

  return inject(Router).createUrlTree(['/catalog'], {
    queryParams: { acceso: 'denegado' },
  });
};
