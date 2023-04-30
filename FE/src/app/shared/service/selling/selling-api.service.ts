import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiConstant} from "../../constants/ApiConstant";

@Injectable({
  providedIn: 'root'
})
export class SellingApiService {

  api = ApiConstant.api;

  constructor(private readonly http: HttpClient) { }

  getAllCategories(): Observable<any>{
    return this.http.get(`${this.api}category/all`)
  }

  getProByCate(id: any): Observable<any>{
    return this.http.get(`${this.api}product/findByCate/${id}`)
  }

  getProductDetail(id: any): Observable<any>{
    return this.http.get(`${this.api}productDetail/getByProduct/${id}`)
  }

  paymentSelling(obj: any): Observable<any>{
    return this.http.post(`${this.api}selling/payment`,obj);
  }

  resetQuantityInventory(lst: any):Observable<any>{
    return this.http.post(`${this.api}selling/resetQuantityInventory`,lst);
  }
}
