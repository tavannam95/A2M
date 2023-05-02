import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MovieListComponent } from 'app/page/movies/movie-list/movie-list.component';
import { RoomListComponent } from 'app/page/rooms/room-list/room-list.component';
import { AccountListComponent } from 'app/page/account/account-list/account-list.component';
import { BillListComponent } from 'app/page/bill/bill-list/bill-list.component';
import { ShowtimeListComponent } from 'app/page/showtime/showtime-list/showtime-list.component';
import { TicketListComponent } from 'app/page/ticket/ticket-list/ticket-list.component';
import { RoleGuard } from 'app/guard/role.guard';

export const AdminLayoutRoutes: Routes = [

    {
        path: 'dashboard', component: DashboardComponent, data: {
            role: 'ROLE_EMPLOYEE',
            message: 'Bạn không có quyền truy cập chúc năng này !'
        },
        canActivate: [RoleGuard],
    },
    {
        path: 'notifications', component: NotificationsComponent, data: {
            role: 'ROLE_EMPLOYEE',
            message: 'Bạn không có quyền truy cập chúc năng này !'
        },
        canActivate: [RoleGuard],
    },
    {
        path: 'movie', component: MovieListComponent, data: {
            role: 'ROLE_EMPLOYEE',
            message: 'Bạn không có quyền truy cập chúc năng này !'
        },
        canActivate: [RoleGuard],
    },
    {
        path: 'room', component: RoomListComponent, data: {
            role: 'ROLE_ADMINSTRATOR',
            message: 'Bạn không có quyền truy cập chúc năng này !'
        },
        canActivate: [RoleGuard],
    },
    {
        path: 'account', component: AccountListComponent, data: {
            role: 'ROLE_ADMINSTRATOR',
            message: 'Bạn không có quyền truy cập chúc năng này !'
        },
        canActivate: [RoleGuard],
    },
    {
        path: 'bill', component: BillListComponent, data: {
            role: 'ROLE_EMPLOYEE',
            message: 'Bạn không có quyền truy cập chúc năng này !'
        },
        canActivate: [RoleGuard],
    },
    {
        path: 'showtime', component: ShowtimeListComponent, data: {
            role: 'ROLE_EMPLOYEE',
            message: 'Bạn không có quyền truy cập chúc năng này !'
        },
        canActivate: [RoleGuard],
    },
    {
        path: 'ticket', component: TicketListComponent, data: {
            role: 'ROLE_EMPLOYEE',
            message: 'Bạn không có quyền truy cập chúc năng này !'
        },
        canActivate: [RoleGuard],
    },
];
