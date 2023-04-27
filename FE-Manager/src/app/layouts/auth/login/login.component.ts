import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { JwtService } from 'app/services/jwt/jwt.service';
import { LoginServiceService } from 'app/services/login/login-service.service';
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
        let param = this.route.snapshot.queryParams;
        if (param['redirectUrl']) {
          this.redirectUrl = param['redirectUrl'];
        }
        console.log(param['id']);
        
        if (this.redirectUrl) {
          this.router.navigateByUrl(this.redirectUrl)
            .then(() => this.jwtService.reloadPage())
            .catch(() => this.router.navigate(['/home']))
        } else {
          this.router.navigate(['/home']).then(() => this.jwtService.reloadPage())
        }
        console.log('get token');
        console.log(this.cookieService.getToken());
      }
    })
    
  }

}
