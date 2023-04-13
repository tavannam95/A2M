import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowtimeRoutingModule } from './showtime-routing.module';
import { ShowtimeFormComponent } from './showtime-form/showtime-form.component';
import { ShowtimeListComponent } from './showtime-list/showtime-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    ShowtimeFormComponent,
    ShowtimeListComponent
  ],
  imports: [
    CommonModule,
    ShowtimeRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    NgxDropzoneModule
  ]
})
export class ShowtimeModule { }
