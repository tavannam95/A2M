import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryFormComponent} from './category-form/category-form.component';
import {CategoryListComponent} from './category-list/category-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {CategoryManagerRoutingModule} from './category-manager-routing.module';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        CategoryFormComponent,
        CategoryListComponent
    ],
    imports: [
        CommonModule,
        CategoryManagerRoutingModule,
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
        MatMenuModule
    ]
})
export class CategoryManagerModule {
}
