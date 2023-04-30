import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {

constructor(private readonly http: HttpClient) { }

    getDafaultContact(): Observable<any>{
    return this.http.get(ApiConstant.contact);
    }
}
