import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectSeatRoutingModule } from './select-seat-routing.module';
import { SelectSeatComponent } from './select-seat/select-seat.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    SelectSeatComponent
  ],
  imports: [
    CommonModule,
    SelectSeatRoutingModule,
    MatCheckboxModule,
  ]
})
export class SelectSeatModule { }
