import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectMovieRoutingModule } from './select-movie-routing.module';
import { SelectMovieComponent } from './select-movie/select-movie.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SelectMovieComponent
  ],
  imports: [
    CommonModule,
    SelectMovieRoutingModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule
  ]
})
export class SelectMovieModule { }
