import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../../constants/ApiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductImageApiService {

constructor(
  private http: HttpClient
) { }

getAllProductImage(){
  return this.http.get(ApiConstant.productImage);
}
getProductImage(id: number): Observable<any> {
  return this.http.get(`${ApiConstant.productImage}/${id}`);
}

createProductImage(data: any): Observable<any> {
  return this.http.post(ApiConstant.productImage, data);
}

deleteProductImage(data: any, id: number){
  return this.http.delete(`${ApiConstant.productImage}/${id}`, data)
}
getProductImageById(id: any): Observable<any>{
  return this.http.get(`${ApiConstant.productImage}/product/${id}`);
}
}
