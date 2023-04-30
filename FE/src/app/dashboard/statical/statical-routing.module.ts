import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StaticalComponent} from './statical.component';
import {content_admin} from '../../shared/router/admin_router';

const routes: Routes = [
  {
    path: '' ,
    redirectTo: 'turnover' ,
    pathMatch: 'full'
  },{
    path: '' ,
    component: StaticalComponent ,
    children: content_admin
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticalRoutingModule { }
