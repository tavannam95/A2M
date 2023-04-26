import { Injectable } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class Cookie2Service {

  // private jwtHelper = new JwtHelperService();

  constructor(
  ) { }

  public saveToken(token: any){
    Cookie.set('token',token);
  }
  public getToken(){
    return Cookie.get('token');
  }
  public delete(){
    Cookie.delete('token');
  }
}
