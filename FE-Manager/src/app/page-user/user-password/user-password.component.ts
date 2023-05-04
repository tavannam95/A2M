import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'app/services/account/account.service';
import { JwtService } from 'app/services/jwt/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {

  imgUrl: any;
  account: any;
  username: any;
  message: any;
  check: Boolean;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  formGroup = this.fb.group({
    username: ['', [Validators.required]],
    oldPassword: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private accountService: AccountService,
    private jwt: JwtService
  ) { }

  ngOnInit(): void {
    this.username = this.jwt.getUsernameFromToken();
    console.log(this.username);
    this.accountService.getPassword().subscribe(response => {
      console.log(response);
      this.formGroup.patchValue({
        username: response.username,
      })
    });
    this.formGroup.get('oldPassword').valueChanges
    .pipe(
      debounceTime(500), 
      distinctUntilChanged()
      ).subscribe(value => {
      // gửi value xuống BE check nó đúng hay sai   
      this.accountService.checkPassword(value).subscribe(response => {
        // this.accountService.checkPassword(this.formGroup.get('oldPassword').value).subscribe(response => {
        console.log("check: " + response);

        if (response) {
          this.message = ""
        }
        else {
          this.message = 'Mật khẩu cũ không đúng';
        }

      });
    });
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.get('password').value == this.formGroup.get('confirmPassword').value) {
      console.log(this.formGroup.value);
      this.accountService.updatePassword(this.formGroup.value).subscribe()
      this.toastrService.success("Đổi mật khẩu thành công");
      this.message = '';
    }
    else {
      this.message = 'Nhập lại mật khẩu không trùng khớp';
    }
  }
}
