import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lancamento } from '@shared/models/Lancamento';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { PageInfo } from '@shared/models/GenericPageableResponse';

@Component({
  templateUrl: './rule-grid.component.html'
})
export class RuleGridComponent implements OnInit {

  info: Lancamento[];


  constructor(
    public dialogRef: MatDialogRef<RuleGridComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // Saída temporária
    this.info = this.data.table;
  }


  dateFormat(date: string) {
    const dates = date.split('-');
    return `${dates[2]}/${dates[1]}/${dates[0]}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
