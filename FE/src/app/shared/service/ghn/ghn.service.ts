import { Injectable } from '@angular/core';
import { GhnApiService } from './ghn-api.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GhnService {

  constructor(
    private ghnApiService: GhnApiService
  ) { }

  createOrderGhn(data: any){
    return this.ghnApiService.createOrderGhn(data);
  }
  getOrderGhn(orderCode: any){
    return this.ghnApiService.getOrderGhn(orderCode);
  }
  getDate(){
    return this.ghnApiService.getDate();
  }
  genToken(orderCode: any){
    return this.ghnApiService.genToken(orderCode);
  }
  cancelOrder(orderCode: any){
    return this.ghnApiService.cancelOrderGhn(orderCode);
  }

  getProvince(){
    return this.ghnApiService.getProvince();
  }

  getDistrict(data:any){
    return this.ghnApiService.getDistrict(data);
  }

  getWard(data:any){
    return this.ghnApiService.getWard(data);
  }

  getService(data:any){
    return this.ghnApiService.getService(data);
  }

  getShippingOrder(data:any){
    return this.ghnApiService.getShippingOrder(data);
  }

}
