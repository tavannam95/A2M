import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { FormPersonComponent } from './form-person/form-person.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserAccountComponent } from './user-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    FormPersonComponent,
    UserInfoComponent,
    TransactionComponent,
    UserAccountComponent
  ],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDropzoneModule,
    MatRadioModule,
  ]
})
export class UserAccountModule { }
