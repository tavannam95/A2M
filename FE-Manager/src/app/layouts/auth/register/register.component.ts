import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { RegisterService } from 'app/services/register/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;

  selected: string = '';

  yearArray: number[] = [];

  user = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    birthDate: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  registerForm: FormGroup;

  ngOnInit() {}

  onSubmit() {
    console.log(this.user)
  }

  submit() {
    this.isLoading = true;
    this.registerService.createUser(this.user).subscribe({
      next: resp=>{
        console.log(resp)
        if(resp.status === true){
          this.toastrService.success(resp.message)
          this.isLoading = false;
          this.router.navigate(['login']);
        }
        else if (resp.status === false){
          this.toastrService.warning(resp.message)
          this.isLoading = false;
        }
      }
    })
  }
}
