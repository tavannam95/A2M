import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { JwtService } from 'app/services/jwt/jwt.service';
import { LoginServiceService } from 'app/services/login/login-service.service';
import { HeadersUtil } from 'app/util/headers-util';
import { Cookie, CookieService } from 'ng2-cookies/cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  redirectUrl: any;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private cookieService: Cookie2Service,
    private route: ActivatedRoute,
    private readonly router: Router,
    private jwtService: JwtService
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
    this.loginService.login(this.loginForm.value).subscribe({
      next: res => {
        const token = res.token;
        this.cookieService.saveToken(token);
        HeadersUtil.getHeadersAuth();      
        if (this.jwtService.getRoleFromToken()=== 'ROLE_ADMINSTRATOR' || this.jwtService.getRoleFromToken()=== 'ROLE_EMPLOYEE') {
          this.router.navigate(['/dashboard']);
        }else{
          this.router.navigate(['/home']);
        }
      }
    })
  }

  register(){
    this.router.navigate(['/register']);
  }

  changePass(){
    
  }

}
