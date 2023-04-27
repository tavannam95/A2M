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
    console.log(this.jwtService.getExpiration());
    
  }

  login(){
    console.log(this.formGroup.value);
    this.http.post("http://localhost:8080/api/v1/auth/login",this.formGroup.value).subscribe({
      next: res =>{
        console.log(res);
      },
      error: e =>{
        console.log(e);
      }
    })

  }
  

}
