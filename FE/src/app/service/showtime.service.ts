import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from 'app/constant/ApiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

constructor(private http: HttpClient) { }

  today2():Observable<any>{
    return this.http.get(ApiConstant.showtime);
  }

}
