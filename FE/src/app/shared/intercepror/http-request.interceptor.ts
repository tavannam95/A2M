import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpHeaders,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "../service/storage.service";
import {Router} from "@angular/router";
import { ApiConstant } from '../constants/ApiConstant';
import { Ghn } from '../constants/Ghn';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  // cancelOrderGhn = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel';
  // addressGhn = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data';

  constructor(private readonly storageService: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.storageService.isLoggedIn() && this.storageService.getExpiration()) {
      this.storageService.clearToken();
    }

    const userToken = this.storageService.getToken();
    let httpHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });

    if(req.url.includes("Duong dan api ")){
      httpHeader = httpHeader.append("Token", "value");
    }

    if (userToken != null) {
      httpHeader = httpHeader.append('Authorization', 'Bearer ' + userToken)
    }
    if (req.url.includes('https://dev-online-gateway.ghn.vn')) {
      httpHeader = httpHeader.append('Token', Ghn.TOKEN);
      httpHeader = httpHeader.append('ShopId', Ghn.SHOP_ID);
    }
    // if (req.url.includes('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shift')||req.url.includes(this.addressGhn)){
    //   httpHeader = httpHeader.append('Token', Ghn.TOKEN);
    // }
    if (req.url.includes('https://online-gateway.ghn.vn')) {
      httpHeader = httpHeader.append('Token', 'cff0fcca-5ddf-11ed-ad26-3a4226f77ff0');
      httpHeader = httpHeader.append('ShopId', '3424019');
    }
    // if (req.url.includes('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token')){
    //   httpHeader = httpHeader.append('Token', Ghn.TOKEN);
    // }
    // if (req.url.includes('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data')){
    //   httpHeader = httpHeader.append('Token', Ghn.TOKEN);
    // }
    // if (req.url.includes('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data')){
    //   httpHeader = httpHeader.append('Token', Ghn.TOKEN);
    // }
    // if (req.url.includes('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data')){
    //   httpHeader = httpHeader.append('Token', Ghn.TOKEN);
    // }
    // if (req.url.includes('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services')){
    //   httpHeader = httpHeader.append('Token', Ghn.TOKEN);
    // }
    // if (req.url.includes('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee')){
    //   httpHeader = httpHeader.append('Token', Ghn.TOKEN);
    // }

    req = req.clone({
      headers: httpHeader
    });
    return next.handle(req);
  }
}


export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
