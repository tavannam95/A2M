import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  selected: string = '';

  yearArray: number[] = [];

  user = {
    fullname: '',
    username: '',
    email: ['', [Validators.required, Validators.email]],
    password: '',
    birthDate: ''
  };

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  registerForm: FormGroup;

  ngOnInit() {
    
  }

  onSubmit() {

  }

  submit() {

  }
}
