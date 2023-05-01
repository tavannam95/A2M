import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePassService } from 'app/services/changePass/change-pass.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-save-pass',
  templateUrl: './save-pass.component.html',
  styleUrls: ['./save-pass.component.scss']
})
export class SavePassComponent implements OnInit {

  isLoading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<SavePassComponent>,
    private matDialog: MatDialog,
    private changePassService: ChangePassService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  title: String = 'Đổi mật khẩu'

  savePassForm = this.fb.group({
    newPassword: ['', Validators.required],
    acceptPass: ['', Validators.required],
  })

  selected: String = ''

  get newPassword() { return this.savePassForm.get('newPassword'); }
  get acceptPass() { return this.savePassForm.get('acceptPass'); }

  ngOnInit(): void {
    // console.log(this.dataDialog.row);
    
  }

  onSubmit() {
    // this.dataDialog.patchValue({password: this.newPassword})
    this.dataDialog.data.password = this.savePassForm.value.acceptPass;
    console.log(this.dataDialog.data)
    this.changePassService.savePass(this.dataDialog.data).subscribe({
      next: res=>{
        if(res.status == true){
          this.toastrService.success(res.message)
          this.matDialogRef.close()
          this.router.navigate(['/login']);
        }
        else{
          this.toastrService.warning(res.message)
        }
      }
    })
  }

}
