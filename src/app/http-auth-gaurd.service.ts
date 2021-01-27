import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetTokenService } from './get-token.service';
@Injectable({
  providedIn: 'root'
})
export class HttpAuthGaurdService implements HttpInterceptor {
  token:any;
  constructor( private auth:GetTokenService) { 
    // this.token=JSON.parse(auth.getToken()).password;
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}
