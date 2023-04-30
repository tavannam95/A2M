import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StaticalTurnoverComponent} from './statical-turnover.component';

const routes: Routes = [
  {
    path: '' ,
    component: StaticalTurnoverComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticalTurnoverRountingModule { }
