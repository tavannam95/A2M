import { Component, OnInit, Inject, } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { ToastrService } from 'ngx-toastr';
import { Regex } from 'app/services/regex/regex';
import { take } from 'rxjs';
import { Observable } from 'rxjs';
import { ShowtimeService } from 'app/services/showtime/showtime.service';

@Component({
  selector: 'app-showtime-form',
  templateUrl: './showtime-form.component.html',
  styleUrls: ['./showtime-form.component.scss']
})
export class ShowtimeFormComponent implements OnInit {

  isLoading = false;

  messengerUsername: string = 'Không được để trống ô này';

  title: string = 'Showtimes'

  selected_id: string;

  day = new Date();

  day2 = new Date();

  day3 = new Date();

  day4 = new Date();

  day5 = new Date();

  day6 = new Date();

  day7 = new Date();  

  select_day: string = '';

  dayArray: string[] = [];

  movies: {
    id: number,
    name: string
  }

  titanic: User;

  formGroup = this.fb.group({
    // id: [''],
    fullname: ['', [Validators.required, Validators.pattern(Regex.unicode)]],
    username: ['', [Validators.required]],
    photo: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', Validators.required],
    gender: [null, Validators.required],
    role: { id: null }
  })

  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
      private fb: FormBuilder,
      private matDialog: MatDialog,
      private toastrService: ToastrService,
      private showtimesService: ShowtimeService
    ) { }

  ngOnInit() {
    this.dayArray.push(this.day.toLocaleDateString());
    this.day2.setDate(this.day.getDate()+1);
    this.dayArray.push(this.day2.toLocaleDateString());
    this.day3.setDate(this.day2.getDate()+1);
    this.dayArray.push(this.day3.toLocaleDateString());
    this.day4.setDate(this.day3.getDate()+1);
    this.dayArray.push(this.day4.toLocaleDateString());
    this.day5.setDate(this.day4.getDate()+1);
    this.dayArray.push(this.day5.toLocaleDateString());
    this.day6.setDate(this.day5.getDate()+1);
    this.dayArray.push(this.day6.toLocaleDateString());
    this.day7.setDate(this.day6.getDate()+1);
    this.dayArray.push(this.day7.toLocaleDateString());
  }

  getDate(){

  }

  onSubmit(){

  }

  getMovie(){

  }
}

type User = {
  firstName: string;
  lastName: string;
  age: number;
  job?: string;
};
