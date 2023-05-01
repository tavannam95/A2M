import { async } from '@angular/core/testing';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'app/constants/Constant';
import { AccountService } from 'app/services/account/account.service';
import { CloudinaryService } from 'app/services/cloudinary/cloudinary.service';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { NotificationService } from 'app/services/notification-service/notification.service';
import { Regex } from 'app/services/regex/regex';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.scss']
})
export class FormPersonComponent implements OnInit {
  // isLoading = true;

  titleMess = '';
  files: File[] = [];
  imgUrl: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  info: any;

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
  ) { }

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
      this.getUser();
      this.titleMess = 'Bạn có muốn cập nhật thông tài khoản?'
      console.log(this.formGroup);
      console.log(this.info);
      
      this.info.patchValue(
        {
          fullname: this.info.fullname,
          username: this.info.username,
          email: this.info.email,
          birthDate: this.info.birthDate,
          gender: this.info.gender,
          phone: this.info.phone,
          photo: this.info.photo,
        }
      );
  }

  onSubmit(){
    this.accountService.updateUser(this.formGroup.value);
    console.log(this.formGroup.value);
    console.log(this.accountService.updateUser(this.formGroup.value));
    
  }

  getUser(){
    this.accountService.getUser()
        .subscribe(response => {
          this.info = response;
          console.log(this.info);
          
          // this.isLoading = false;
        });
  }
  // async uploadImage() {
  //   if (this.files.length > 0) {
  //     await this.uploadImg();
  //   }

  //     this.updateUser();

  //   }

  // onSubmit() {
  //   this.formGroup.markAllAsTouched();
  //   if (this.formGroup.invalid) {
  //     return;
  //   }
  //   this.accountService.updateUser(this.formGroup.value).subscribe({
  //     next: res => {
  //       this.toastrService.success(res.message);
  //       // this.isLoading = false;

  //     },
  //     error: e => {
  //       console.log(e);

  //     }
  //   })

  }


// updateMovie() {
//   this.matDialog.open(ConfirmDialogComponent, {
//     disableClose: true,
//     hasBackdrop: true,
//     data: {
//       message: 'Bạn có muốn cập nhật thông tin phim?'
//     }
//   }).afterClosed().subscribe(result => {
//     if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
//       this.isLoading = true;
//       // this.notificationService.showNotification('success', 'Sửa thành công !');

//     }
//   })
// }

// onSelect(event) {
//   if (this.files.length > 0) {
//     this.files.splice(0, 1);
//   }
//   this.files.push(...event.addedFiles);
// }

// onRemove(event) {
//   this.files.splice(this.files.indexOf(event), 1);
// }

//   async uploadImg() {
//   const formData = new FormData();
//   if (this.files.length > 0) {
//     formData.append('files', this.files[0])
//   }
//   try {
//     this.imgUrl = await this.uploadImageService.upload(formData).toPromise();

//     this.formGroup.patchValue({ poster: this.imgUrl.data[0] });

//   } catch (error) {
//     console.log(error);

//   }



