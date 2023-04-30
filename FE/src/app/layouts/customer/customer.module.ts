import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { UserAccountModule } from 'app/page-user/user-account/user-account.module';
import { ComponentsModule } from 'app/components/components.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UserAccountModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
