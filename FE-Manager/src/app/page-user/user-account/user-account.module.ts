import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { FormPersonComponent } from './form-person/form-person.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { UserAccountComponent } from './user-account.component';


@NgModule({
  declarations: [
    FormPersonComponent,
    UserInfoComponent,
    TransactionComponent,
    LeftMenuComponent,
    UserAccountComponent
  ],
  imports: [
    CommonModule,
    UserAccountRoutingModule
  ]
})
export class UserAccountModule { }
