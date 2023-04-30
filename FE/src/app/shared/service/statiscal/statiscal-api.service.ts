import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConstant} from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class StatiscalApiService {

  constructor( private http: HttpClient ) {

  }

  CustomerBuyMostProduct( data : any){
    return this.http.post(`${ApiConstant.statiscal}/CustomerBuyMostProduct` , data )
  }

  getOverview(){
    return this.http.get(`${ApiConstant.statiscal}/overview`)
  }

  buyTheMostProduct( data: any ){
    return this.http.post(`${ApiConstant.statiscal}/buyMostPro` , data );
  }

  turnoverBeforeSevenDy(data: any){
     return this.http.post( `${ApiConstant.statiscal}/turnover` , data ) ;
  }
}
