import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StaticalCustomerComponent} from './statical-customer.component';

const routes: Routes  = [
  {
    path: '' ,
    component: StaticalCustomerComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticalCustomerRountingModule { }
