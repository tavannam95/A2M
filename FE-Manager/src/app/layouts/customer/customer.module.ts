import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { UserAccountModule } from 'app/page-user/user-account/user-account.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UserAccountModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
