import {Component, OnInit} from '@angular/core';
import {MenuItems, RouteInfo} from '../../shared/menu/menuItems';
import {StorageService} from '../../shared/service/storage.service';

// declare const $: any;
//
// declare interface RouteInfo {
//     path: string;
//     title: string;
//     icon: string;
//     class: string;
// }
//
// export const ROUTES: RouteInfo[] = [
//     {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
//     {path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
//     {path: '/table-list', title: 'Table List', icon: 'content_paste', class: ''},
//     {path: '/typography', title: 'Typography', icon: 'library_books', class: ''},
//     {path: '/icons', title: 'Icons', icon: 'bubble_chart', class: ''},
//     {path: '/notifications', title: 'Notifications', icon: 'notifications', class: ''},
// ];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: RouteInfo[];

    constructor(public readonly storageService: StorageService) {
    }

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
