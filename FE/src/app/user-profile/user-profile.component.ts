import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private toast: ToastrService) { }

  ngOnInit() {

  }

  show() {
    this.toast.success("Hihi")
  }
}
