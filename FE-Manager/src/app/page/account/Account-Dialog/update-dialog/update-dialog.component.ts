import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Regex } from 'app/services/regex/regex';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AccountListComponent } from '../../account-list/account-list.component';
import { log } from 'console';


@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
  private fb: FormBuilder,
  private matDialogRef: MatDialogRef<UpdateDialogComponent>,
  private matDialog: MatDialog) { }

  title: String = 'Account'

  formGroupUpdate = this.fb.group({
    // id: [''],
    fullname: [this.dataDialog.row.fullname, [Validators.required, Validators.pattern(Regex.unicode)]],
    username: [this.dataDialog.row.username, Validators.required, Validators.minLength(8)],
    password: [this.dataDialog.row.password, Validators.required, Validators.minLength(8)],
    email: [this.dataDialog.row.email, Validators.required],
    // birthday: ['', Validators.required],
    gender: [this.dataDialog.row.gender, Validators.required],
  })

  selected: String = 'Female'

  ngOnInit(): void {
    console.log(this.dataDialog);   
  }

  onSubmited() {
    console.log(this.dataDialog.value.email)
  }

  onFocus(event: any){
    console.log(event.target.value + "jdflka");
  }
}
