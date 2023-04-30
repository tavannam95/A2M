import { LoadingComponent } from '../../../shared/loading/loading.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerManagerRoutingModule} from './customer-manager-routing.module';
import {CustomerFormComponent} from './customer-form/customer-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerFormComponent,
        LoadingComponent,
    ],
    imports: [
        CommonModule,
        CustomerManagerRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxDropzoneModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatMenuModule,
    ]
})
export class CustomerManagerModule {
}
