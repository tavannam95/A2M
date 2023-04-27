import { Component, NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CustomerLayoutComponent } from './layouts/customer/customer-layout/customer-layout.component';
import { LoginComponent } from './layouts/auth/login/login.component';
import { TestCookieComponent } from './page-user/test-cookie/test-cookie.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {path: 'login', component: LoginComponent},
  {
    path: 'test-ck',
    component: TestCookieComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/customer/customer.module').then(m => m.CustomerModule)
    }],
  },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
