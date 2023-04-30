import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

constructor(private readonly http: HttpClient) { }

  getDataOrder(): Observable<any>{
    return this.http.get(`${ApiConstant.order}/data`);
  }

  getAllOrder(page: any, size: any): Observable<any>{
    return this.http.get(`${ApiConstant.order}?page=${page}&size=${size}`);
  }

  verifyOrCancelOrder(data: any, status: number){
    return this.http.put(`${ApiConstant.order}/updateStatus/${status}`,data);
  }
  getOrderGhn(): Observable<any>{
    return this.http.get(`${ApiConstant.order}/ghn`);
  }

  findByStatus(status: any, page: any, size: any): Observable<any>{
    return this.http.get(`${ApiConstant.order}/data/${status}?page=${page}&size=${size}`);
  }

  searchOrder(searchOrderDTO: any, page: any, size: any): Observable<any>{
    return this.http.post(`${ApiConstant.order}/search?page=${page}&size=${size}`, searchOrderDTO);
  }

  findAllByStatus(stt: any): Observable<any>{
    return this.http.get(`${ApiConstant.order}/status/${stt}`);
  }

  updateStatus(data: any, status: number){
    return this.http.put(`${ApiConstant.order}/updateStatus/${status}`,data);
  }
  
  update(data: any): Observable<any>{
    return this.http.put(ApiConstant.order,data);
  }

  updateOrder(data: any): Observable<any>{
    return this.http.put(`${ApiConstant.order}/update-order`,data);
  }

  findById(id: any): Observable<any>{
    return this.http.get(`${ApiConstant.order}/${id}`);
  }

  findExchange(page: any, size: any): Observable<any>{
    return this.http.get(`${ApiConstant.order}/exchange?page=${page}&size=${size}`);
  }

  findAllExchange(): Observable<any>{
    return this.http.get(`${ApiConstant.order}/allExchange`);
  }
}
