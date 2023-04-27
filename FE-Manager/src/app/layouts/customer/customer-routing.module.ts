import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/page-user/home/home/home.component';
import { FareComponent } from 'app/page-user/fare/fare/fare.component';
import { SelectMovieComponent } from 'app/page-user/select-movie/select-movie/select-movie.component';
import { SelectSeatComponent } from 'app/page-user/select-seat/select-seat/select-seat.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { UserAccountModule } from '../../page-user/user-account/user-account.module';
import { AuthGuard } from 'app/guard/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'select-movie', component: SelectMovieComponent, canActivate: [AuthGuard]},
  {path: 'fare', component: FareComponent},
  {path: 'select-seat', component: SelectSeatComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {
    path: 'user-account',
    loadChildren: () => import('../../page-user/user-account/user-account.module').then(m => m.UserAccountModule)
  },
  { path: 'select-seat', component: SelectSeatComponent },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
