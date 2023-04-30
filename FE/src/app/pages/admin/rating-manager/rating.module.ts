import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RatingRouterModule} from './rating-router.module';
import {RatingComponent} from './rating.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
      RatingComponent
  ],
  imports: [
    CommonModule,
    RatingRouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
        MatButtonModule,
        MatSortModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxDropzoneModule,
        MatRadioModule,
  ]
})
export class RatingModule { }
