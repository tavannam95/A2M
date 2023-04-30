import { Injectable } from '@angular/core';
import {StatiscalApiService} from './statiscal-api.service';

@Injectable({
  providedIn: 'root'
})
export class StatiscalService {

  constructor( private apiStatiscal: StatiscalApiService ) {

  }

  CustomerBuyMostProduct( data: any){
      return this.apiStatiscal.CustomerBuyMostProduct( data) ;
  }

  getOverview(){
     return this.apiStatiscal.getOverview() ;
  }

  buyTheMostProduct( data: any ){
      return this.apiStatiscal.buyTheMostProduct(data);
  }

  turnover( data: any ){
      return this.apiStatiscal.turnoverBeforeSevenDy( data );
  }
}
