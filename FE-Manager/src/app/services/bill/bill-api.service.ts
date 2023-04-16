import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from 'app/constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class BillApiService {
  [x: string]: any;

constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(`${ApiConstant.bill}/listBill`);
  }

  getOne(id: any): Observable<any>{
    return this.http.get(`${ApiConstant.bill}/${id}`);
  }
}
