import { Injectable } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

const USER_TOKEN = 'user-token';


@Injectable({
  providedIn: 'root'
})
export class Cookie2Service {

  // private jwtHelper = new JwtHelperService();


  constructor(
  ) { }

  public saveToken(token: any){
    Cookie.set(USER_TOKEN,token);
  }
  public getToken(){
    return Cookie.get(USER_TOKEN);
  }
  public delete(){
    Cookie.delete(USER_TOKEN);
  }
}
