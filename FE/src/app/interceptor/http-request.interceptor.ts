import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cookie2Service } from "app/services/cookie2/cookie2.service";
import { Observable } from "rxjs";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: Cookie2Service
  ) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userToken = this.cookieService.getToken();

    let httpHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });

    if (userToken != null) {
      httpHeader = httpHeader.append('Authorization', 'Bearer ' + userToken)
    }

    if (req.url.includes("http://localhost:8080/api/v1/auth/login")) {
      httpHeader.append('Content-Type', 'application/json')
    }

    if (userToken) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${userToken}`)
      });
      return next.handle(authRequest);
    }
    return next.handle(req);
  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];