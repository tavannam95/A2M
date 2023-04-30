import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-od-dialog',
  templateUrl: './create-od-dialog.component.html',
  styleUrls: ['./create-od-dialog.component.scss']
})
export class CreateOdDialogComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<CreateOdDialogComponent>
  ) { }

  ngOnInit() {
  }

  close(){
    this.matDialogRef.close();
  }
}
