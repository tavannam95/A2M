import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductDetailFormComponent } from './product-detail-form/product-detail-form.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ImportExcelDialogComponent } from './dialog/import-excel-dialog/import-excel-dialog.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { NgxCurrencyModule } from 'ngx-currency';
import { PrintBarcodeDialogComponent } from '../dialog/product-view-dialog/print-barcode-dialog/print-barcode-dialog.component';


@NgModule({
  declarations: [
    ProductDetailFormComponent, 
    ImportExcelDialogComponent, 
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    NgxDropzoneModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    NgxCurrencyModule
  ]
})
export class ProductDetailModule { }
