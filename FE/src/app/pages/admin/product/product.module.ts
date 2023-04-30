import { NgModule, AfterViewInit, ViewChild } from "@angular/core";
import { CategoryCreateDialogComponent } from '../dialog/category-create-dialog/category-create-dialog.component';
import { ProductEditDialogComponent } from '../dialog/product-edit-dialog/product-edit-dialog.component';
import { CommonModule } from "@angular/common";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductRoutingModule } from "./product-routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTreeModule} from '@angular/material/tree';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import { ColorCreateDialogComponent } from '../dialog/color-create-dialog/color-create-dialog.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ProductViewDialogComponent } from '../dialog/product-view-dialog/product-view-dialog.component';
import { ProductViewImagesDialogComponent } from '../dialog/product-view-dialog/product-view-images-dialog/product-view-images-dialog.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { PrintBarcodeDialogComponent } from '../dialog/product-view-dialog/print-barcode-dialog/print-barcode-dialog.component';

@NgModule({
  declarations: [
    ProductFormComponent, 
    ProductListComponent, 
    CategoryCreateDialogComponent, 
    ProductEditDialogComponent,
    ColorCreateDialogComponent,
    ProductViewDialogComponent,
    PrintBarcodeDialogComponent,
    ProductViewImagesDialogComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatRippleModule,
    NgxDropzoneModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTreeModule,
    MatTooltipModule,
    MatMenuModule,
    MatRadioModule,
    ScrollingModule,
    NgxCurrencyModule,
  ],
})
export class ProductModule{
  
  constructor() {
  }
  
}

