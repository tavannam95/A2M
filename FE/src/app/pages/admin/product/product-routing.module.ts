import { ProductFormComponent } from './product-form/product-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import {RoleGuard} from '../../../shared/guard/role.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'create',
    component: ProductFormComponent,
    canActivate:[RoleGuard],
    data:{
      role: 'ROLE_SUPER_ADMIN',
      message: 'Bạn không có quyển truy cập chức năng này !'
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
