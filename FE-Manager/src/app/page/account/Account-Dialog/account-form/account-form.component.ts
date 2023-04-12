import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Regex } from 'app/services/regex/regex';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AccountListComponent } from '../../account-list/account-list.component';
import { AccountService } from 'app/services/account/account.service';
import { take } from 'rxjs';
import { Observable } from 'rxjs';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  @ViewChild(AccountListComponent) accountList: AccountListComponent

  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<AccountFormComponent>,
    private matDialog: MatDialog,
    private accountService: AccountService) { }

  title: string = 'Account'

  formGroup = this.fb.group({
    // id: [''],
    fullname: ['', [Validators.required, Validators.pattern(Regex.unicode)]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    birth_date: ['', Validators.required],
    gender: [null, Validators.required],
    role: { id: null }
  })

  selected: string = 'Female'

  selected_id: string;

  ngOnInit(): void {
    console.log(this.dataDialog);
    if (this.dataDialog.type == 'create') {
      this.title = 'Add Account';
    }
    if (this.dataDialog.type == 'update') {
      this.title = 'Update Account';
    }
  }

  messengerUsername: string = 'Không được để trống ô này';

  onSubmit() {
    const id = (this.selected_id === "ADMINSTATOR") ? 3 : 2

    this.formGroup.patchValue({ role: { id: id } });
    // console.log(this.formGroup.value);

    this.accountService.save(this.formGroup.value).subscribe({
      next: res => {
        console.log(this.formGroup.value);
        this.matDialogRef.close()
        if(res.status===true){
          this.matDialog.open(SuccessDialogComponent, {
            disableClose: true,
            data: {},
            width: '700px'
          })
        }
        else{
          this.matDialog.open(ErrorDialogComponent, {
            disableClose: true,
            data: {
              res
            },
            width: '700px'
          })
        }
      },
      error: e=>{
        console.log(e);
        
      }
    }
    )
  }


}