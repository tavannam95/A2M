import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';
import { HeadersUtil } from 'app/util/headers-util';


@Injectable({
  providedIn: 'root'
})
export class BillApiService {
  [x: string]: any;

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${ApiConstant.bill}/listBill`);
  }

  printTicket(data: any): Observable<any> {
    return this.http.put<any>(`${ApiConstant.bill}/print-ticket/${data}`, null);
  }

  findByBarcode(barcode: any): Observable<any> {
    return this.http.get<any>(`${ApiConstant.bill}/barcode/${barcode}`);
  }

  getOne(id: any): Observable<any> {
    return this.http.get<any>(`${ApiConstant.bill}/${id}`);
  }

  createBill(data: any): Observable<any> {
    return this.http.post<any>(`${ApiConstant.bill}/create`, data);
  }
}
