import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PathRest } from '../static/static';

@Injectable()
export class GenericInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token')!;
    let requestClone = req;
    if (!this.isLoginWeb(req.url)) {
      requestClone = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(requestClone).pipe(
      catchError((error) => {
        return this.herrorHandler(error);
      })
    );
  }

  private herrorHandler(error: HttpErrorResponse): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        alert('ERROR DE CLIENTE');
      } else {
        if (error.status === 401) {
          alert('Usuario o contraseña incorrecta');
          this.router.navigateByUrl('/login');
        } else {
          alert('ERROR DE SERVIDOR');
        }
      }
    } else {
      alert('OTRO TIPO DE ERROR');
    }
    return throwError(error);
  }

  private isLoginWeb(url: string): boolean {
    return url.search(PathRest.GET_LOGIN) != -1;
  }
}
