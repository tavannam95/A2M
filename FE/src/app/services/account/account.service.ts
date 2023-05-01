import { Injectable } from '@angular/core';
import { AccountApiService } from './account-api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apiService: AccountApiService) { }

  getAll() {
    return this.apiService.getAll();
  }

  save(data: any) {
    return this.apiService.save(data);
  }

  getEmails() {
    return this.apiService.getEmails();
  }

  updateAccount(data: any){
    return this.apiService.updateAccount(data);
  }
}
