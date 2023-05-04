import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'app/constants/Constant';
import { AccountService } from 'app/services/account/account.service';
import { CloudinaryService } from 'app/services/cloudinary/cloudinary.service';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { JwtService } from 'app/services/jwt/jwt.service';
import { NotificationService } from 'app/services/notification-service/notification.service';
import { Regex } from 'app/services/regex/regex';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isLoading = false;

  titleMess = 'Cập nhật thành công';
  files: File[] = [];
  imgUrl: any;
  info: any = {
    photo: ''
  };
  account: any;
  username: any;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  formGroup = this.fb.group({
    fullname: ['', [Validators.required, Validators.pattern(Regex.unicodeAndNumber)]],
    username: [''],
    email: ['', [Validators.required, Validators.pattern(Regex.email)]],
    birthDate: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(Regex.number)]],
    photo: [''],
  })
  constructor(

    private fb: FormBuilder,
    private notificationService: NotificationService,
    private toastrService: ToastrService,
    private accountService: AccountService,
    private uploadImageService: CloudinaryService,
    private jwt: JwtService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
    this.username = this.jwt.getUsernameFromToken();
    this.accountService.getUser().subscribe(response => {
      this.formGroup.patchValue({
        fullname: response.fullname,
        username: response.userName,
        email: response.email,
        birthDate: response.birthDate,
        gender: response.gender,
        phone: response.phone,
        photo: response.photo,
      })
      this.info = response;

    });
  }



  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }

    this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        message: 'Bạn có muốn cập nhật thông tin cá nhân?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.update();
      }
    })
  }

  async update() {
    this.isLoading = true;
    if (this.files.length > 0) {
      await this.uploadImg();
    }
    this.accountService.updateUser(this.formGroup.value).subscribe({
      next: res => {
        this.isLoading = false;
        this.toastrService.success('Cập nhật thông tin thành công')
        this.accountService.getUser().subscribe(response => {
          this.formGroup.patchValue({
            fullname: response.fullname,
            username: response.userName,
            email: response.email,
            birthDate: response.birthDate,
            gender: response.gender,
            phone: response.phone,
            photo: response.photo,
          })
          this.info = response;
    
        });
      },
      error: e => {
        this.isLoading = false;
        this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
      }
    })
  }

  
  onSelect(event) {
    if (this.files.length > 0) {
      this.files.splice(0, 1);
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async uploadImg() {
    const formData = new FormData();
    if (this.files.length > 0) {
      formData.append('files', this.files[0])
    }
    try {
      this.imgUrl = await this.uploadImageService.upload(formData).toPromise();
      this.formGroup.patchValue({ photo: this.imgUrl[0] });
    } catch (error) {

    }
  }

}
