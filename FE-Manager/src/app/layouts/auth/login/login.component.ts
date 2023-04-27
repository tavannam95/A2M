import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { LoginServiceService } from 'app/services/login/login-service.service';
import { Cookie, CookieService } from 'ng2-cookies/cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private cookieService: Cookie2Service
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

  login() {
    // this.jwtRespones.username = this.loginForm.value
    console.log('=====login form');
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value).subscribe({
      next: res => {
        const token = res.token;
        this.cookieService.saveToken(token);
        console.log('get token');
        console.log(this.cookieService.getToken());
      }
    })
    
  }

}
