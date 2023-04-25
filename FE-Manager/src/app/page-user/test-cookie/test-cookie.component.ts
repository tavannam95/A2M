import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';

@Component({
  selector: 'app-test-cookie',
  templateUrl: './test-cookie.component.html',
  styleUrls: ['./test-cookie.component.scss']
})
export class TestCookieComponent implements OnInit {

  formGroup = this.fb.group({
    token: ['']
  })

  constructor(
    private fb: FormBuilder,
    private cookie2Service: Cookie2Service
  ) { }

  ngOnInit() {
  }

  save(){
    this.cookie2Service.saveToken(this.formGroup.value.token);    
  }
  delete(){
    this.cookie2Service.delete();
  }
  get(){
    console.log(this.cookie2Service.getToken());
  }

}
