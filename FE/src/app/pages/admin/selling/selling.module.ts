import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {MatTabsModule} from "@angular/material/tabs";
import {SellingComponent} from "./selling/selling.component";
import {SellingRoutingModule} from "./selling-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from "@angular/material/sidenav";
import { ProductDetailOrderComponent } from './selling/product-detail-order/product-detail-order.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
// @ts-ignore
import {NgxCurrencyModule} from "ngx-currency";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import { ComfirmSellingComponent } from './selling/comfirm-selling/comfirm-selling.component';

@NgModule({
    declarations: [SellingComponent, ProductDetailOrderComponent, ComfirmSellingComponent],
    imports: [
        CommonModule,
        MatTabsModule,
        SellingRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatBadgeModule,
        MatSidenavModule,
        FormsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        NgxCurrencyModule,
        ZXingScannerModule,
        MatRadioModule,
        MatSelectModule
    ],
    providers: [CurrencyPipe]
})
export class SellingModule {

}
