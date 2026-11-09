import { DOCUMENT } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiTokenService } from '../services/api-token-service';

const apiUrl = new URL(environment.apiUrl);
const apiPath = apiUrl.pathname.replace(/\/+$/, '');

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(ApiTokenService).token();
  if (!token || request.headers.has('Authorization')) {
    return next(request);
  }

  const url = new URL(request.url, inject(DOCUMENT).baseURI);
  const isApiRequest =
    url.origin === apiUrl.origin &&
    (url.pathname === apiPath || url.pathname.startsWith(`${apiPath}/`));

  return next(isApiRequest ? request.clone({ setHeaders: { Authorization: token } }) : request);
};
