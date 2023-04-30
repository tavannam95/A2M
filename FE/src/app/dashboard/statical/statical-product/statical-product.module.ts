import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaticalProductComponent} from './statical-product.component';
import {StaticalProductRountingModule} from './statical-product-rounting.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {NativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [ StaticalProductComponent ],
    imports: [
        CommonModule,
        StaticalProductRountingModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        NativeDateModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule
    ]
})
export class StaticalProductModule { }
