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

  get fields() {
    return [
      { span: 'Comentário Inicial', name: 'Campo 1:' },
      { span: 'Comentário 2', name: 'Campo 2:' },
      { span: 'Comentário 3', name: 'Campo 3:' },
      { span: 'Comentário 4', name: 'Campo 4:' },
      { span: 'Comentário 5', name: 'Campo 5:' },
    ];
  }

}
