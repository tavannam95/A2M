export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    role: string[],
    class: string;
}

export const MenuItems: RouteInfo[] = [
    {path: '/dashboard', title: 'Tổng quan', icon: 'fas fa-globe-asia', role: ['ROLE_SUPER_ADMIN'], class: ''},
    {path: '/statical', title: 'Thống kê', icon: 'fas fa-chart-pie', role: ['ROLE_SUPER_ADMIN'], class: ''},
    {path: '/staff', title: 'Nhân viên', icon: 'fas fa-user-tie', role: ['ROLE_SUPER_ADMIN'], class: ''},
    {path: '/customer', title: 'Khách hàng', icon: 'fas fa-users', role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'], class: ''},
    {path: '/order', title: 'Đơn hàng', icon: 'fas fa-clipboard', role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'], class: ''},
    {path: '/product', title: 'Sản phẩm', icon: 'fas fa-box', role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'], class: ''},
    {path: '/promotion', title: 'Khuyến mại', icon: 'fas fa-percentage', role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'], class: ''},
    {path: '/category', title: 'Danh mục', icon: 'fas fa-th-list', role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'], class: ''},
    {path: '/rating', title: 'Đánh giá', icon: 'fas fa-star', role: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'], class: ''}
]
