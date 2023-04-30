import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaticalTurnoverComponent} from './statical-turnover.component';
import {StaticalTurnoverRountingModule} from './statical-turnover-rounting.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [ StaticalTurnoverComponent ],
    imports: [
        CommonModule,
        StaticalTurnoverRountingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
    ]
})
export class StaticalTurnoverModule { }
