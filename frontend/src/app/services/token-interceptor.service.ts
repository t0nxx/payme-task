import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('token')) {
      const tokenWithReq = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token')
        }
      })
      return next.handle(tokenWithReq);
    } else {
      return next.handle(req);
    }

  }
}
