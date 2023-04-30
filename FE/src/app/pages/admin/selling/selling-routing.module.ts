import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SellingComponent} from "./selling/selling.component";

const routes: Routes = [
  {
    path: '',
    component: SellingComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellingRoutingModule { }
