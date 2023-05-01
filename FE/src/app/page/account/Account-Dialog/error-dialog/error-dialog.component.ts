import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: any,
  private fb: FormBuilder,
  private matDialogRef: MatDialogRef<ErrorDialogComponent>,
  private matDialog: MatDialog,) { }

  ngOnInit(): void {
  }

  errorMessage: string = this.dataDialog.res.message;
}
