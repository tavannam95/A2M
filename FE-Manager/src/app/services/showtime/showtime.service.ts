import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from 'app/constants/ApiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

constructor(private http: HttpClient) { }


  today():Observable<any>{
    return this.http.get(`${ApiConstant.showtime}/today`);
  }

}
