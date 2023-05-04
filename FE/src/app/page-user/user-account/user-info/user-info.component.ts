import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'app/services/account/account.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  isLoading = true;

  info = {
    photo: '',
    fullname: '',
    email: '',
    birthDate: '',
    gender: null,
    phone: ''
  };

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.accountService.getUser()
        .subscribe(response => {
          this.info = response;
          this.isLoading = false;
        });
  }

}
