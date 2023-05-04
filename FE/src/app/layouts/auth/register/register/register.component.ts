import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Regex } from 'app/services/regex/regex';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { AccountListComponent } from '../../account-list/account-list.component';
import { AccountService } from 'app/services/account/account.service';
import { take } from 'rxjs';
import { Observable } from 'rxjs';
// import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
// import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { CloudinaryService } from 'app/services/cloudinary/cloudinary.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'app/services/register/register.service';
// import { Router } from 'express';
import { Router } from '@angular/router';

interface User {
  fullname?: string;
  username?: string;
  password?: string;
  email?: string;
  birthDate?: Date;
  gender?: boolean;
  role?: { id: 1 };
  createDate: Date;
  createBy: string,
  updateDate: Date,
  updateBy: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // registerForm: FormGroup;

  days: string[] = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  months: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
  ];

  isLoading = false;

  user: User[] = [];

  years: string[] = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());


  selectedDate: string = null;

  selectedMonth: string = null;

  selectedYear: string = null;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
  ) { }

  registerForm = this.fb.group({
    fullname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    date: [],
    month: [],
    year: [],
    birthDate: [],
    gender: [],
    createDate: [],
    createBy: [],
    updateDate: [],
    updateBy: [],
  });

  ngOnInit(): void {
    // this.registerForm.patchValue({birthDate: ''+this.registerForm.value.date+'-'+this.registerForm.value.date+'-'+this.registerForm.value.date})
  }

  get fullname() { return this.registerForm.get('fullname'); }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get gender() { return this.registerForm.get('gender'); }
  // get birthDate() { return this.registerForm.get('year'+'-'+'month'+'-'+'date'); }

  onSubmit() {
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        message: 'Bạn có muốn đăng ký không?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.user = [];
        let newDate = new Date();
        this.registerForm.patchValue({ birthDate: '' + this.registerForm.value.year + '-' + this.registerForm.value.month + '-' + this.registerForm.value.date })
        this.registerForm.patchValue({ createDate: newDate });
        this.user.push({
          fullname: this.registerForm.value.fullname, username: this.registerForm.value.username,
          password: this.registerForm.value.password, email: this.registerForm.value.email,
          birthDate: new Date("" + this.registerForm.value.birthDate), gender: (this.registerForm.value.gender === 'Female') ? false : true,
          role: { id: 1 }, createDate: newDate, createBy: '', updateDate: null, updateBy: ''
        });
        this.registerService.createUser(this.user[0]).subscribe({
          next: resp => {
            if (resp.status === true) {
              this.toastrService.success(resp.message);
              this.isLoading = false;
              this.router.navigate(['/login']);
            }
            else {
              this.isLoading = false;
              this.toastrService.warning(resp.message);
            }
          },
          error: e => {
            this.toastrService.error('Lỗi hệ thống vui lòng thử lại sau');
          }
        })
      }
    })
  }
}

