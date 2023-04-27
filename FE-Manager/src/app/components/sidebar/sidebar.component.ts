import { Component, OnInit } from '@angular/core';
import { MenuItems, RouteInfo } from 'app/menu/menuItem';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];

  constructor() { }

  ngOnInit() {
    this.menuItems = MenuItems.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
