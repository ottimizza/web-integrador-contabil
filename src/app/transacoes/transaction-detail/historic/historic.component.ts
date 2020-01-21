import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent {

  constructor(
    public dialogRef: MatDialogRef<HistoricComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick() { }

}
