import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPersonComponent } from './form-person/form-person.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserAccountComponent } from './user-account.component';
import { AuthGuard } from 'app/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserAccountComponent,
    children: [
      { path: 'form-person', component: FormPersonComponent, canActivate: [AuthGuard] },
      { path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard]  },
      { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard]  }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule { }
