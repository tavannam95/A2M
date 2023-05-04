export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    role: string[],
    class: string;
}

export const MenuItems: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard',role: ['ROLE_ADMINSTRATOR','ROLE_EMPLOYEE'], class: '' },
    // { path: '/test', title: 'Test',  icon: 'heart',role: ['ROLE_ADMINSTRATOR','ROLE_EMPLOYEE'], class: '' },
    { path: '/account', title: 'Tài khoản',  icon:'assignment_ind',role: ['ROLE_ADMINSTRATOR'], class: '' },
    { path: '/room', title: 'Phòng chiếu',  icon:'meeting_room',role: ['ROLE_ADMINSTRATOR'], class: '' },
    { path: '/movie', title: 'Phim',  icon:'live_tv',role: ['ROLE_ADMINSTRATOR','ROLE_EMPLOYEE'], class: '' },
    { path: '/bill', title: 'Hóa đơn',  icon:'receipt_long',role: ['ROLE_ADMINSTRATOR','ROLE_EMPLOYEE'], class: '' },
    { path: '/showtime', title: 'Lịch chiếu',  icon:'theaters',role: ['ROLE_ADMINSTRATOR','ROLE_EMPLOYEE'], class: '' },
    { path: '/ticket', title: 'Vé',  icon:'local_activity',role: ['ROLE_ADMINSTRATOR','ROLE_EMPLOYEE'], class: '' },
    //Customer
    { path: '/home', title: 'Amenic',  icon:'',role: [], class: '' },

];