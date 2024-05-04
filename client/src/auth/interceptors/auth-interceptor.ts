import { Injectable, Provider } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HTTP_INTERCEPTORS,
    HttpResponse
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router,private authService:AuthService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        let authReq;
        if (this.authService.getUserLoggedIN()) {    
            authReq = req.clone({
                setHeaders: { 'X-AUTH-TOKEN':this.authService.getAuthToken() }
            })
        }
        else authReq = req.clone();
        return next.handle(authReq).pipe(
            tap({
                error: (err) => {
                    if (req.url.search(/\/api\/login/) <= -1) {
                        if (err.status == 401) {
                            localStorage.removeItem('authToken');
                            this.router.navigate(['/login'],
                                {
                                    state: {
                                        'message': 'Authentication Failure, Login Required.'
                                    }
                                })
                        }
                    }
                },
            })
        );

    }
}

/** Provider for the Noop Interceptor. */
export const HttpInterceptorProviders: Provider = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];