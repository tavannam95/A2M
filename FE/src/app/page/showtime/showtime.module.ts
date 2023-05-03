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
import { MatCardModule } from '@angular/material/card';
import { ShowtimesDetailComponent } from './showtimes-detail/showtimes-detail.component';
// import { TableShowtimesDialogComponent } from './showtime-dialog/table-showtimes-dialog/table-showtimes-dialog.component';


@NgModule({
  declarations: [
    ShowtimeFormComponent,
    ShowtimeListComponent,
    ShowtimesDetailComponent
    // TableShowtimesDialogComponent
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
    NgxDropzoneModule,
    MatCardModule
  ]
})
export class ShowtimeModule { }
