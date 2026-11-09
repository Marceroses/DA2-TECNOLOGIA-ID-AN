import { DOCUMENT } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth-service';

const apiUrl = new URL(environment.apiUrl);
const apiPath = apiUrl.pathname.replace(/\/+$/, '');

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).getToken();
  if (!token || request.headers.has('Authorization')) {
    return next(request);
  }

  const url = new URL(request.url, inject(DOCUMENT).baseURI);
  const isApiRequest =
    url.origin === apiUrl.origin &&
    (url.pathname === apiPath || url.pathname.startsWith(`${apiPath}/`));

  return next(isApiRequest ? request.clone({ setHeaders: { Authorization: token } }) : request);
};
