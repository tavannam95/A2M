import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaticalCustomerComponent} from './statical-customer.component';
import {StaticalCustomerRountingModule} from './statical-customer-rounting.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [ StaticalCustomerComponent ],
    imports: [
        CommonModule,
        StaticalCustomerRountingModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class StaticalCustomerModule { }
