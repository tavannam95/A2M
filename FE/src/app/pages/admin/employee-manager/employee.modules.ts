import {NgModule} from '@angular/core';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeFormComponent} from './employee-form/employee-form.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        EmployeeListComponent,
        EmployeeFormComponent,
    ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxDropzoneModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        FormsModule,
        MatIconModule,
        MatMenuModule,
    ],
    entryComponents: [EmployeeFormComponent]
})

export class EmployeeModules {
}

