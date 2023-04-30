import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderRoutingModule} from "./order-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
import { OrderListComponent } from './order-list/order-list.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { PreparingProductComponent } from './dialog/preparing-product/preparing-product.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EditAddressDialogComponent } from './dialog/edit-address-dialog/edit-address-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { EditOrderComponent } from './dialog/edit-order/edit-order.component';
import { OrderExchangeComponent } from './dialog/order-exchange/order-exchange.component';
import { WrongProductDetailComponent } from './dialog/wrong-product-detail/wrong-product-detail.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
    declarations: [
        OrderListComponent,
        PreparingProductComponent,
        EditAddressDialogComponent,
        EditOrderComponent,
        OrderExchangeComponent,
        WrongProductDetailComponent
    ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTabsModule,
        MatDividerModule,
        MatCardModule,
        MatRadioModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatSelectModule,
        MatMenuModule,
        MatBadgeModule
    ]
})
export class OrderModule {
}
