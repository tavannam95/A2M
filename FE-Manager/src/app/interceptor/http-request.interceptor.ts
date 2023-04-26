import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor{
    constructor() {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let httpHeader = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
          });

          if (req.url.includes("http://localhost:8080/api/v1/auth/login")) {
            httpHeader.append('Content-Type', 'application/json') 
          }
          req = req.clone({
            headers: httpHeader
          });
          return next.handle(req);


        throw new Error("Method not implemented.");
    }

}

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
  ];