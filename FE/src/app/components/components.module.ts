import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarUserComponent } from './user/navbar-user/navbar-user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavbarUserComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavbarUserComponent
  ]
})
export class ComponentsModule { }
