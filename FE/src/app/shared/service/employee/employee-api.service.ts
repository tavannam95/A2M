import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConstant} from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {


  constructor( private http: HttpClient ) { }

  getAll() : Observable<any> {
    return this.http.get( ApiConstant.employee ) ;
  }

  create( employee: any ): Observable<any> {
    return this.http.post( ApiConstant.employee , employee ) ;
  }

  update( employee: any ) : Observable<any> {
    return this.http.put( `${ ApiConstant.employee }/${employee.id}` , employee ) ;
  }

  updateStatus( employee: any ): Observable<any> {
    return this.http.put( `${ ApiConstant.employee }/status/${employee.id}` , employee );
  }

  getById( id: number ): Observable<any> {
    return this.http.get(`${ ApiConstant.employee }/${id}`) ;
  }

  changPassword( id: number , oldPassword: any , newPassword: any ){
     return this.http.get(`${ApiConstant.employee}/changPassword?id=${id}&&oldPassword=${oldPassword}&&newPassword=${newPassword}`);
  }
}
