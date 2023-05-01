import { Component, OnInit } from '@angular/core';
import { BillService } from 'app/services/bill/bill.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  isLoading = true;
  showBillDetails = false;

  bills: any;
  countTickets: any;

  constructor(
    private billService: BillService
  ) { }

  ngOnInit(): void {
    this.getBillUser();
  }

  getBillUser() {
    this.billService.getBillUser()
      .subscribe(response => {
        this.bills = response;
        console.log(this.bills);
        if (this.bills.length > 0) {
          this.bills.forEach((element) => {
            element.countTickets = element.listTickets.length;
          })
          this.isLoading = false;
        }
      })
  }

  toggleBillDetails() {
    this.showBillDetails = !this.showBillDetails;
  }

}

