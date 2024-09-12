import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from './services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(UserService).getAuthToken();

  if (authToken) {
    const newReq = req.clone({
      // headers: req.headers.append
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return next(newReq);
  }
  return next(req);
};
