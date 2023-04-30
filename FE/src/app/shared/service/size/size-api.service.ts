import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class SizeApiService {

constructor(
  private readonly http: HttpClient
) { }

getAllSize(){
  return this.http.get(ApiConstant.size);
}

getOneSize(id: any){
  return this.http.get(`${ApiConstant.size}/${id}`);
}
}
