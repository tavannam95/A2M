import { Component, OnInit } from '@angular/core';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { JwtService } from 'app/services/jwt/jwt.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {

  constructor(
    private cookieService: Cookie2Service,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
  }

  logout(){
    this.cookieService.delete();
    this.jwtService.reloadPage();
  }


}
