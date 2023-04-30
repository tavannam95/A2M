import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        DashboardRoutingModule,
        MatTooltipModule,
        CommonModule,
    ],

    declarations: [
        DashboardComponent,
    ]
})

export class DashboardModule {
}
