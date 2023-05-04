import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Regex } from 'app/services/regex/regex';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AccountListComponent } from '../../account-list/account-list.component';
import { AccountService } from 'app/services/account/account.service';
import { JwtService } from 'app/services/jwt/jwt.service';


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
    private accountService: AccountService,
    private jwtService: JwtService
  ) { }

  title: String = 'Account'

  formGroupUpdate = this.fb.group({
    id: [this.dataDialog.row.id],
    fullname: [this.dataDialog.row.fullname, [Validators.required, Validators.pattern(Regex.unicode)]],
    username: [this.dataDialog.row.username, [Validators.required, Validators.minLength(8)]],
    email: [this.dataDialog.row.email, Validators.required],
    birthDate: [this.dataDialog.row.birthDate],
    gender: [this.dataDialog.row.gender, Validators.required],
    createBy: [(this.dataDialog.row.createBy===null)?'':this.dataDialog.row.createBy],
    updateBy: [this.jwtService.decode().sub],
    createDate: [(this.dataDialog.row.createDate===null)?'':this.dataDialog.row.createDate],
    updateDate: [(this.dataDialog.row.updateDate===null)?'':this.dataDialog.row.updateDate],
  })
  // birthDate = new Date();
  selected: String = (this.dataDialog.row.gender===true)?'Nam':'Nữ';
  ngOnInit(): void {
    // this.birthDate = new Date(this.dataDialog.row.birthDate);
  }

  onSubmited() {
    let updateDate = new Date();
    const gender1 = (this.selected==='Female')? 0 : 1;
    this.formGroupUpdate.patchValue({gender:gender1});
    this.formGroupUpdate.patchValue({birthDate: new Date(this.formGroupUpdate.value.birthDate)});
    this.accountService.updateAccount(this.formGroupUpdate.value).subscribe((data) => {
      next:
      this.matDialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS);
    })
    window.location.reload();
  }


  }

