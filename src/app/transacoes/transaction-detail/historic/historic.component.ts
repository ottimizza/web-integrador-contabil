import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lancamento } from '@shared/models/Lancamento';

@Component({
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  fields: any[];
  historic: any[];
  lancamento: Lancamento;

  constructor(
    public dialogRef: MatDialogRef<HistoricComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.fields = [
      { span: 'Comentário Inicial', name: 'Campo 1:' },
      { span: 'Comentário 2', name: 'Campo 2:' },
      { span: 'Comentário 3', name: 'Campo 3:' },
      { span: 'Comentário 4', name: 'Campo 4:' },
      { span: 'Comentário 5', name: 'Campo 5:' },
    ];
    this._reset();
  }

  onChange(event: any, index: number) {
    this.historic[index].combo = event;
    console.log(this.historic);
  }

  onKeyup(event: any, index: number) {
    this.historic[index].field = event;
    console.log(this.historic);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  get params() {
    const h = this.historic;
    let text = '';

    this.historic.forEach(obj => {
      text += obj.field + ' ';
      text += obj.combo + ' ';
    });
    return text;
  }

  private _reset() {
    this.historic = [
      { field: '', combo: '' },
      { field: '', combo: '' },
      { field: '', combo: '' },
      { field: '', combo: '' },
      { field: '', combo: '' },
    ];
    this.lancamento = this.data.lancamento;
  }


}
