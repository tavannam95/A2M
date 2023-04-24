import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomListComponent } from './room-list/room-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { RoomDialogComponent } from './dialog/room-dialog/room-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SeeRoomDialogComponent } from './dialog/see-room-dialog/see-room-dialog.component';
import { RowFormDialogComponent } from './dialog/row-form-dialog/row-form-dialog.component';
import { ShowRoomComponent } from './dialog/show-room/show-room.component';
import { AddRowComponent } from './dialog/add-row/add-row.component';

@NgModule({
  declarations: [
    RoomListComponent,
    RoomDialogComponent,
    SeeRoomDialogComponent,
    RowFormDialogComponent,
    ShowRoomComponent,
    AddRowComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class RoomsModule { }
