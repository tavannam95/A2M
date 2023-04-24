import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/page-user/home/home/home.component';
import { FareComponent } from 'app/page-user/fare/fare/fare.component';
import { SelectMovieComponent } from 'app/page-user/select-movie/select-movie/select-movie.component';
import { SelectSeatComponent } from 'app/page-user/select-seat/select-seat/select-seat.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'select-movie', component: SelectMovieComponent},
  {path: 'fare', component: FareComponent},
  {path: 'select-seat', component: SelectSeatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
