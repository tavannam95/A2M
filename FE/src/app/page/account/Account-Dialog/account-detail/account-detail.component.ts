import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'app/services/account/account.service';
import { CloudinaryService } from 'app/services/cloudinary/cloudinary.service';
import { JwtService } from 'app/services/jwt/jwt.service';
import { Regex } from 'app/services/regex/regex';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  isLoading = false;
  
  messengerUsername: string = 'Không được để trống ô này';
  

  title: string = 'Account'

  formGroup = this.fb.group({
    // id: [''],
    id: [this.dataDialog.row.id],
    fullname: [this.dataDialog.row.fullname],
    username: [this.dataDialog.row.username],
    email: [this.dataDialog.row.email],
    birthDate: [this.dataDialog.row.birthDate],
    gender: [(this.dataDialog.row.gender===true)?'Nam':'Nữ'],
    createBy: [this.dataDialog.row.createBy],
    updateBy: [this.jwtService.decode().sub],
    createDate: [this.dataDialog.row.createDate],
    updateDate: [this.dataDialog.row.updateDate],
    role: [this.dataDialog.row.role.name]
  })

  // selected: string = 'Female'

  selected_id: string;

  photo: string = (this.dataDialog.row.photo != null)? this.dataDialog.row.photo : '';


  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
      private fb: FormBuilder,
      private matDialogRef: MatDialogRef<AccountDetailComponent>,
      private matDialog: MatDialog,
      private jwtService: JwtService
    ) { }

  ngOnInit(): void {
    if (this.dataDialog.type == 'Detail') {
      this.title = 'Xem chi tiết';
    }
  }

}
