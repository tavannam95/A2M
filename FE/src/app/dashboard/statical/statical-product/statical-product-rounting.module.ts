import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StaticalProductComponent} from './statical-product.component';

const routes: Routes  = [
  {
    path: '' ,
    component: StaticalProductComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticalProductRountingModule { }
