import { ApiConstant } from './../../constants/ApiConstant';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeApiService {


  constructor( private http: HttpClient ) { }

  findByOrderId(id: any): Observable<any>{
    return this.http.get( `${ ApiConstant.exchange }/${id}`) ;
  }

  updateStatusExchange(exchange: any, status: any){
    return this.http.put(`${ ApiConstant.exchange }/update/${status}`,exchange);
  }
  
}
