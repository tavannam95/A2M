import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../../constants/ApiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorApiService {

constructor(
  private readonly http: HttpClient
) { }

createColor(data: any){
  return this.http.post(ApiConstant.color,data);
}

getOneColor(id: number): Observable<any>{
  return this.http.get(`${ApiConstant.color}/${id}`);
}

getAllColor(){
  return this.http.get(ApiConstant.color);
}

}
