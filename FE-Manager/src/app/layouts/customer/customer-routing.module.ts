import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/page-user/home/home/home.component';
import { FareComponent } from 'app/page-user/fare/fare/fare.component';
import { SelectMovieComponent } from 'app/page-user/select-movie/select-movie/select-movie.component';
import { SelectSeatComponent } from 'app/page-user/select-seat/select-seat/select-seat.component';
import { UserAccountModule } from '../../page-user/user-account/user-account.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'select-movie', component: SelectMovieComponent },
  { path: 'fare', component: FareComponent },
  {
    path: 'user-account',
    loadChildren: () => import('../../page-user/user-account/user-account.module').then(m => m.UserAccountModule)
  },
  { path: 'select-seat', component: SelectSeatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
