import { Component, OnInit } from '@angular/core';
import { BillService } from 'app/services/bill/bill.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  isLoading = true;
  showBillDetailsIndex: number | null = null;

  bills: any;
  countTickets: any;
  barCodeImg = "https://barcode.tec-it.com/barcode.ashx?data=";
  barCodeSub = "&code=EAN8";
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
        if (this.bills.length > 0) {
          this.bills.forEach((element) => {
            element.countTickets = element.listTickets.length;
          
          })
          this.isLoading = false;
        }
      })
  }

  toggleBillDetails(index: number) {
    this.showBillDetailsIndex = this.showBillDetailsIndex === index ? null : index;
  }

}

