import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lancamento } from '@shared/models/Lancamento';

@Component({
  templateUrl: './rule-grid.component.html'
})
export class RuleGridComponent implements OnInit {

  info: Lancamento[];

  constructor(
    public dialogRef: MatDialogRef<RuleGridComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  dateFormat(date: string) {
    const dates = date.split('-');
    return `${dates[2]}/${dates[1]}/${dates[0]}`;
  }

  ngOnInit(): void {
    this.info = this.data.table;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
