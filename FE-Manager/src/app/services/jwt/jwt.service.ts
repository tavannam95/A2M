import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cookie2Service } from '../cookie2/cookie2.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private jwtHelper = new JwtHelperService();

  constructor(private cookieService: Cookie2Service) { }

  reloadPage() {
      window.location.reload();
  }

  decode(){
    try {
      const decode = this.jwtHelper.decodeToken(this.cookieService.getToken());
      console.log(decode);
      console.log(decode.sub);
      return decode !== null ? decode: null;
    } catch (e) {
      this.cookieService.delete();
      this.reloadPage();      
    }
  }

  /**Check user đã đăng nhập */
    public isLoggedIn() :boolean{
      const authToken = this.cookieService.getToken();
      return authToken !== undefined && authToken !== '' && authToken !== null;
  }

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
    return this.jwtHelper.isTokenExpired(this.cookieService.getToken());
  }

}
