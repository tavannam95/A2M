import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from 'app/constants/ApiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RowApiService {

constructor(private http: HttpClient) { }

createRow(data: any): Observable<any>{
  return this.http.post(ApiConstant.row,data);
}

getByRoom(data: any): Observable<any>{
  return this.http.post(`${ApiConstant.row}/row-of-room`,data);
}

}
