import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangePassService } from 'app/services/changePass/change-pass.service';
import { SavePassComponent } from './save-pass/save-pass.component';
import { Constant } from 'app/constants/Constant';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  isLoading = false;

  changePassForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
  });
  
  constructor(
    private fb: FormBuilder,
    private changePassServie: ChangePassService,
    private matDialog: MatDialog,
  ) { }

  get username() { return this.changePassForm.get('username'); }
  get email() { return this.changePassForm.get('email'); }

  ngOnInit(): void {
  }

  onSubmit(){
    this.changePassServie.changepass(this.changePassForm.value.username, this.changePassForm.value.email).subscribe({
      next: res=>{
        if(res.status === true){
          let data = res.data;
          this.matDialog.open(SavePassComponent, {
            disableClose: true,
            data: {
              data
            },
            width: '700px'
          }).afterClosed().subscribe(result => {
            if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
              // ----------------------After close----------------------
            }
          })
        }
      }
    })
  }

}
