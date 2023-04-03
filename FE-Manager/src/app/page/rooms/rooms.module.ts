import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomListComponent } from './room-list/room-list.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    RoomListComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ]
})
export class RoomsModule { }
