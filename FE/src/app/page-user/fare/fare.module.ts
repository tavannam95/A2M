import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FareRoutingModule } from './fare-routing.module';
import { FareComponent } from './fare/fare.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    FareComponent
  ],
  imports: [
    CommonModule,
    FareRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class FareModule { }
