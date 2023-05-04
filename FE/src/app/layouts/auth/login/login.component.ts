import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { JwtService } from 'app/services/jwt/jwt.service';
import { LoginServiceService } from 'app/services/login/login-service.service';
import { HeadersUtil } from 'app/util/headers-util';
import { Cookie, CookieService } from 'ng2-cookies/cookie';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  redirectUrl: any;
  loginForm: FormGroup;

  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private cookieService: Cookie2Service,
    private route: ActivatedRoute,
    private readonly router: Router,
    private jwtService: JwtService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  // onSubmit() {
  //   console.log(this.loginForm.value);
  // }

  login() {
    this.isLoading = true;
    // this.jwtRespones.username = this.loginForm.value
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.login(this.loginForm.value).subscribe({
      next: res => {
        this.isLoading = false;
        if (res.status) {
          const token = res.data.token;
          this.cookieService.saveToken(token);
          HeadersUtil.getHeadersAuth();
          this.toastrService.success(res.message);
          if (this.jwtService.getRoleFromToken() === 'ROLE_ADMINSTRATOR' || this.jwtService.getRoleFromToken() === 'ROLE_EMPLOYEE') {
            this.router.navigate(['/dashboard']);         
          } else {
            this.router.navigate(['/home']);
          }
        }
        else{
        this.isLoading = false;
        this.toastrService.warning(res.message);
        }
      }
    })
  }

  register() {
    this.router.navigate(['/register']);
  }

  changePass() {

  }

}
