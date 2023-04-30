import { Injectable } from '@angular/core';
import { ExchangeApiService } from './exchange-api.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {


  constructor( private apiService: ExchangeApiService ) { }

  findByOrderId(id: any){
    return this.apiService.findByOrderId(id);
  }

  updateStatusExchange(exchange: any, status: any){
    return this.apiService.updateStatusExchange(exchange,status);
  }
  
}
