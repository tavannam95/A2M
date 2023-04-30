import { Component, OnInit } from '@angular/core';
import { MenuItems, RouteInfo } from 'app/menu/menuItem';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { JwtService } from 'app/services/jwt/jwt.service';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];

  constructor(
    private cookieService: Cookie2Service,
    private jwtService: JwtService
    ) { }

  ngOnInit() {
    this.menuItems = MenuItems.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout(){
    this.cookieService.delete();
    this.jwtService.reloadPage();
  }
}
