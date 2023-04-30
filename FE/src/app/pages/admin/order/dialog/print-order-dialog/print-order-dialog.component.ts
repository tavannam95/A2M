import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-print-order-dialog',
  templateUrl: './print-order-dialog.component.html',
  styleUrls: ['./print-order-dialog.component.scss']
})
export class PrintOrderDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<PrintOrderDialogComponent>
  ) { }

  ngOnInit() {
  }
  close(){
    this.matDialogRef.close();
  }
}
