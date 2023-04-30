import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { JwtService } from 'app/services/jwt/jwt.service';

@Component({
  selector: 'app-test-cookie',
  templateUrl: './test-cookie.component.html',
  styleUrls: ['./test-cookie.component.scss']
})
export class TestCookieComponent implements OnInit {

  formGroup = this.fb.group({
    username: [''],
    password: ['']
  })

  constructor(
    private fb: FormBuilder,
    private cookie2Service: Cookie2Service,
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
  }

  decode(){
    this.jwtService.decode();
    console.log(this.jwtService.decode());
    console.log(this.jwtService.getExpiration());
  }

  checkLogin(){
    console.log(this.jwtService.isLoggedIn());
  }

  logOut(){
    this.cookie2Service.delete();
    this.jwtService.reloadPage();
  }

  testTime(){
    console.log(this.jwtService.getExpiration());
    
  }
}
