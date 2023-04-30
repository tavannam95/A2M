import {Routes} from '@angular/router'
import {DashboardComponent} from '../../dashboard/overview/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {ProductModule} from '../../pages/admin/product/product.module';
import {RoleGuard} from '../guard/role.guard';


export const content_admin: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/overview/dashboard.module').then(m => m.DashboardModule),
        canActivate: [RoleGuard],
        data: {
            role: 'ROLE_SUPER_ADMIN',
            message: 'Bạn không có quyền truy cập chúc năng này !'
        }
    },
    {
        path: 'staff',
        loadChildren: () => import('../../pages/admin/employee-manager/employee.modules').then(m => m.EmployeeModules),
        canActivate: [RoleGuard],
        data: {
            role: 'ROLE_SUPER_ADMIN',
            message: 'Bạn không có quyền truy cập chúc năng này !'
        }
    },
    {
        path: 'customer',
        loadChildren: () => import('../../pages/admin/customer-manager/customer-manager.module').then(m => m.CustomerManagerModule),
    },
    {
        path: 'order',
        loadChildren: () => import('../../pages/admin/order/order.module').then(m => m.OrderModule),
    },
    {
        path: 'product',
        loadChildren: () => import('../../pages/admin/product/product.module').then(m => m.ProductModule),
    },
    {
        path: 'productDetail/:id',
        loadChildren: () => import('../../pages/admin/product-detail/product-detail.module').then(m => m.ProductDetailModule),
        canActivate: [RoleGuard],
        data: {
            role: 'ROLE_SUPER_ADMIN',
            message: 'Bạn không có quyển truy cập chức năng này !'
        }
    },
    {
        path: 'category',
        loadChildren: () => import('../../pages/admin/category-manager/category-manager.module').then(m => m.CategoryManagerModule),
    },
    {
        path: 'rating',
        loadChildren: () => import('../../pages/admin/rating-manager/rating.module').then(m => m.RatingModule)
    },
    {
        path: 'statical',
        loadChildren: () => import('../../dashboard/statical/statical.module').then(m => m.StaticalModule),
        canActivate: [RoleGuard],
        data: {
            role: 'ROLE_SUPER_ADMIN',
            message: 'Bạn không có quyền truy cập chúc năng này !'
        }
    },
    {
        path: 'turnover',
        loadChildren: () => import('../../dashboard/statical/statical-turnover/statical-turnover.module').then(m => m.StaticalTurnoverModule),
    },
    {
        path: 'cus',
        loadChildren: () => import('../../dashboard/statical/statical-customer/statical-customer.module').then(m => m.StaticalCustomerModule),
    },
    {
        path: 'pro',
        loadChildren: () => import('../../dashboard/statical/statical-product/statical-product.module').then(m => m.StaticalProductModule),
    },
    {
        path: 'promotion',
        loadChildren: () => import('../../pages/admin/promotion/promotion.module').then(m => m.PromotionModule)
    }
]
