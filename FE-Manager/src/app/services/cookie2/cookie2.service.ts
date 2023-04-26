import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class Cookie2Service {

  private jwtHelper = new JwtHelperService();

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
