import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'app/services/account/account.service';
import { CloudinaryService } from 'app/services/cloudinary/cloudinary.service';
import { NotificationService } from 'app/services/notification-service/notification.service';
import { Regex } from 'app/services/regex/regex';
import { JwtService } from 'app/services/jwt/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Constant } from 'app/constants/Constant';

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.scss']
})
export class FormPersonComponent implements OnInit {
  isLoading = false;

  files: File[] = [];
  imgUrl: any;
  info: any = {};
  account: any;
  username: any;

  gender = true;

  listGender = [
    {
      name: 'Nam',
      value: true
    },
    {
      name: 'Nữ',
      value: false
    },
  ]

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  formGroup = this.fb.group({
    fullname: ['', [Validators.required, Validators.pattern(Regex.unicode)]],
    username: [''],
    email: ['', [Validators.required, Validators.pattern(Regex.email)]],
    birthDate: ['', [Validators.required]],
    gender: [null, [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(Regex.phone)]],
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
      this.gender = response.gender;
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
          this.gender = response.gender;
        });
      },
      error: e => {
        this.isLoading = false;
        this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau');
      }
    })
  }

  async uploadImage() {
    if (this.files.length > 0) {
      await this.uploadImg();

    }

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
      this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau')
    }
  }
}

