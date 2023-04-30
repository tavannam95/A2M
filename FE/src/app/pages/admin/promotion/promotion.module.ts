import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PromotionComponent} from './promotion.component';
import {PromotionApiModule} from './promotion-api.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {PromotionFormComponent} from './promotion-form/promotion-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PromotionProductComponent} from './promotion-product/promotion-product.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [ PromotionComponent , PromotionFormComponent , PromotionProductComponent],
    imports: [
        CommonModule,
        PromotionApiModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatDialogModule,
        MatMenuModule,
        MatChipsModule
    ]
})
export class PromotionModule { }
