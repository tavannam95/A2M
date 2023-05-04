import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/page-user/home/home/home.component';
import { FareComponent } from 'app/page-user/fare/fare/fare.component';
import { SelectMovieComponent } from 'app/page-user/select-movie/select-movie/select-movie.component';
import { SelectSeatComponent } from 'app/page-user/select-seat/select-seat/select-seat.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register/register.component';
import { UserAccountModule } from '../../page-user/user-account/user-account.module';
import { UserPasswordComponent } from 'app/page-user/user-password/user-password.component';
import { AuthGuard } from 'app/guard/auth.guard';
import { ContactComponent } from 'app/page-user/contact/contact.component';
import { MovieDetailsComponent } from 'app/page-user/movie-details/movie-details.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'select-movie', component: SelectMovieComponent, canActivate: [AuthGuard]},
  {path: 'fare', component: FareComponent},
  {path: 'select-seat', component: SelectSeatComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'user-password', component: UserPasswordComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'movie-detail', component: MovieDetailsComponent},
  {
    path: 'user-account',
    loadChildren: () => import('../../page-user/user-account/user-account.module').then(m => m.UserAccountModule)
  },
  // {
  //   path: 'user-password',
  //   loadChildren: () => import('../../page-user/user-password/user-password.module').then(m => m.UserPasswordModule)
  // },
  { path: 'select-seat', component: SelectSeatComponent },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
