import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaticalComponent} from './statical.component';
import {StaticalRoutingModule} from './statical-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [ StaticalComponent ],
    imports: [
        StaticalRoutingModule,
        CommonModule,
        MatTabsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class StaticalModule { }
