export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    role: string[],
    class: string;
}

export const MenuItems: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard',role: [], class: '' },
    { path: '/room', title: 'Phòng chiếu',  icon:'meeting_room',role: [], class: '' },
    { path: '/movie', title: 'Phim',  icon:'live_tv',role: [], class: '' },
    { path: '/account', title: 'Tài khoản',  icon:'assignment_ind',role: [], class: '' },
    { path: '/bill', title: 'Hóa đơn',  icon:'receipt_long',role: [], class: '' },
    { path: '/showtime', title: 'Xuất chiếu',  icon:'theaters',role: [], class: '' },
    { path: '/ticket', title: 'Vé',  icon:'local_activity',role: [], class: '' },
    //Customer
    { path: '/home', title: 'Amenic',  icon:'',role: [], class: '' },

];