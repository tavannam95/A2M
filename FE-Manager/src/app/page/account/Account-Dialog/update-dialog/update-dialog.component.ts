import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Regex } from 'app/services/regex/regex';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AccountListComponent } from '../../account-list/account-list.component';
import { log } from 'console';
import { AccountService } from 'app/services/account/account.service';


@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
  private fb: FormBuilder,
  private matDialogRef: MatDialogRef<UpdateDialogComponent>,
  private matDialog: MatDialog,
  private accountService: AccountService) { }

  title: String = 'Account'

  formGroupUpdate = this.fb.group({
    id: [this.dataDialog.row.id],
    fullname: [this.dataDialog.row.fullname, [Validators.required, Validators.pattern(Regex.unicode)]],
    username: [this.dataDialog.row.username, [Validators.required, Validators.minLength(8)]],
    email: [this.dataDialog.row.email, Validators.required],
    birth_date: [this.dataDialog.row.birth_date, Validators.required],
    gender: [1, Validators.required],
  })

  selected: String = ''

  ngOnInit(): void {
    console.log(this.dataDialog.row);
    
  }

  onSubmited() {
    const gender1 = (this.selected==='Female')? 1 : 0;
    this.formGroupUpdate.patchValue({gender:gender1});
    console.log(this.formGroupUpdate.value);
    this.accountService.updateAccount(this.formGroupUpdate.value).subscribe((data) => {
      next: console.log(this.formGroupUpdate.value);
            this.matDialogRef.close()
    })
  }


}
