import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private jwtHelper = new JwtHelperService();

  constructor() { }

  clean() {
      window.localStorage.clear();
  }

  reloadPage() {
      window.location.reload();
  }

  decode(){
    try {
      const decode = this.jwtHelper.decodeToken('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbXAiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJFTVBMT1lFRSJ9XSwiZXhwIjoxNjgyNTEwMjM0LCJpYXQiOjE2ODI0NzQyMzR9.V3M5SZQX0peyWNCPEgzdBEZ_5L4VX0bZesWfLl47RqM');
      console.log(decode);
      console.log(decode.sub);
      return decode !== null ? decode: null;
    } catch (e) {
      console.log(e);
    }
  }

  /**Check user đã đăng nhập */
  //   public isLoggedIn() :boolean{
  //     const authToken = this.getUserToken();
  //     return authToken !== undefined && authToken?.token !== undefined;
  // }

  /**Decode và lấy Role của token */
  getRoleFromToken() {
    const decode = this.decode();
    return decode !== null && decode?.sub !== null ? decode?.sub : null;
  }

  /**Decode và lấy Role của token */
  getUsernameFromToken() {
    const decode = this.decode();
    return decode !== null && decode?.role !== null ? decode?.role : null;
  }

  /**Decode và lấy thời gian hết hạn của token */
  getExpiration() {
    return this.jwtHelper.isTokenExpired('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbXAiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJFTVBMT1lFRSJ9XSwiZXhwIjoxNjgyNTEwMjM0LCJpYXQiOjE2ODI0NzQyMzR9.V3M5SZQX0peyWNCPEgzdBEZ_5L4VX0bZesWfLl47RqM');
  }

}
