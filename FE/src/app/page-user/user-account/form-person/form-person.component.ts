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

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.scss']
})
export class FormPersonComponent implements OnInit {
  // isLoading = true;


  files: File[] = [];
  imgUrl: any;
  info: any = {};
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
    private jwt: JwtService
  ) { }

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
    this.username = this.jwt.getUsernameFromToken();
    console.log(this.username);
    this.accountService.getUser().subscribe(response => {
      console.log(response);
      this.formGroup.patchValue({
        fullname: response.fullname,
        username: response.userName,
        email: response.email,
        birthDate: response.birthDate,
        gender: response.gender,
        phone: response.phone,
        photo: response.photo,
      })
    });
  }



  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    // this.notificationService.showNotification('success', 'Cập nhật thành công !'); 
    this.toastrService.success("Cập nhật thành công");
    this.accountService.updateUser(this.formGroup.value).subscribe({

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

      this.formGroup.patchValue({ photo: this.imgUrl.data[0] });

    } catch (error) {
      console.log(error);

    }
  }
}

