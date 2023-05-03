import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register/register.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { SavePassComponent } from './change-pass/save-pass/save-pass.component';
// import { RegisterDialogComponent } from './register/register-dialog/register-dialog.component'; 



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChangePassComponent,
    SavePassComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserModule,
    FormsModule,
  ]
})
export class AuthModule { }
