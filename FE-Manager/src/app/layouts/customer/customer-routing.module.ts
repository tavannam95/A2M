import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/page-user/home/home/home.component';
import { FareComponent } from 'app/page-user/fare/fare/fare.component';
import { SelectMovieComponent } from 'app/page-user/select-movie/select-movie/select-movie.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'select-movie', component: SelectMovieComponent},
  {path: 'fare', component: FareComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
