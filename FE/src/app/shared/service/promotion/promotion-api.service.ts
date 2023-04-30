import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConstant} from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class PromotionApiService {

  constructor( private http: HttpClient ) {}

  findAll( data: any){
     return this.http.post(`${ApiConstant.promotion}/findAll` , data)
  }

  create( data: any ){
     return this.http.post(`${ApiConstant.promotion}/create` , data )
  }

  update( data: any ){
    return this.http.put(`${ApiConstant.promotion}/update/${data.id}` , data )
  }

  addProductIntoPromotion( url: any ){
     return this.http.get(`${ApiConstant.promotionProduct}?${url}`)
  }

  getAllProductDiscount( data:any){
      return this.http.get(`${ApiConstant.promotionProduct}/getAll?id=${data}`)
  }


}
