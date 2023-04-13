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
import { CloudinaryService } from 'app/services/cloudinary/cloudinary.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  isLoading = false;
  
  messengerUsername: string = 'Không được để trống ô này';
  

  title: string = 'Account'

  formGroup = this.fb.group({
    // id: [''],
    fullname: ['', [Validators.required, Validators.pattern(Regex.unicode)]],
    username: ['', [Validators.required]],
    photo: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', Validators.required],
    gender: [null, Validators.required],
    role: { id: null }
  })

  selected: string = 'Female'

  selected_id: string;

  files: File[] = [];
  imgUrl: any;


  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
      private fb: FormBuilder,
      private matDialogRef: MatDialogRef<AccountFormComponent>,
      private matDialog: MatDialog,
      private accountService: AccountService,
      private uploadImageService: CloudinaryService,
      private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    console.log(this.dataDialog);
    if (this.dataDialog.type == 'create') {
      this.title = 'Add Account';
    }
    if (this.dataDialog.type == 'update') {
      this.title = 'Update Account';
    }
  }

  onSelect(event) {
    console.log(event);
    if (this.files.length>0) {
      this.files.splice(0,1);
    }
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  

  async uploadImg(){
    const formData = new FormData();
    if (this.files.length>0) {
      formData.append('files',this.files[0])
    }
    try {
      this.imgUrl = await this.uploadImageService.upload(formData).toPromise();
      console.log(this.imgUrl.data[0]);
      
      this.formGroup.patchValue({photo: this.imgUrl.data[0]});
      console.log(this.imgUrl);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async onSubmit() {
    this.isLoading = true;
    if (this.files.length>0) {
      await this.uploadImg();
    }
    const id = (this.selected_id === "ADMINSTATOR") ? 3 : 2
    console.log(this.imgUrl);
    
    this.formGroup.patchValue({ role: { id: id } });
    // console.log(this.formGroup.value);

    this.accountService.save(this.formGroup.value).subscribe({
      next: res => {
        console.log(this.formGroup.value);
        this.matDialogRef.close()
        if(res.status===true){
          this.toastrService.success(res.message);
          this.isLoading = false;
        }
        else{
          this.isLoading = false;
          this.toastrService.warning(res.message);
        }
      },
      error: e=>{
        console.log(e);
        this.toastrService.error('lỗi tạo tài khoản')
      }
    }
    )
  }


}