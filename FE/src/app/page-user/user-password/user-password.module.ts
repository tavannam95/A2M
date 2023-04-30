import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPasswordRoutingModule } from './user-password-routing.module';
import { UserPasswordComponent } from './user-password.component';


@NgModule({
  declarations: [
    UserPasswordComponent
  ],
  imports: [
    CommonModule,
    UserPasswordRoutingModule
  ]
})
export class UserPasswordModule { }
