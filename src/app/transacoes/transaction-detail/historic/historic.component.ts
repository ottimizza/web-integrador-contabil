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
      { span: 'Comentário 4' }
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

  date(date: string) {
    const dates = date.split('-');
    return `${dates[2]}/${dates[1]}/${dates[0]}`;
  }

  get params() {
    const h = this.historic;
    let text = '';

    this.historic.forEach(obj => {
      text += obj.field + ' ';
      // text += obj.combo + ' ';
      const c = obj.combo;
      if (c === 'Fornecedor') {
        text += `${this.lancamento.descricao} `;
      } else if (c === 'Portador') {
        text += `${this.lancamento.portador} `;
      } else if (c === 'Data') {
        text += `${this.date(this.lancamento.dataMovimento)} `;
      } else if (c === 'Valor') {
        text += `${this.lancamento.valorOriginal} `;
      } else if (c === 'Documento') {
        text += `${this.lancamento.documento} `;
      } else if (c === 'Nome do Arquivo') {
        text += `${this.lancamento.arquivo.nome} `;
      } else if (c === 'Tipo da Planilha') {
        text += `${this.lancamento.tipoPlanilha} `;
      } else if (c === 'Complemento 01') {
        text += `${this.lancamento.complemento01} `;
      } else if (c === 'Complemento 02') {
        text += `${this.lancamento.complemento02} `;
      } else if (c === 'Complemento 03') {
        text += `${this.lancamento.complemento03} `;
      } else if (c === 'Complemento 04') {
        text += `${this.lancamento.complemento04} `;
      } else if (c === 'Complemento 05') {
        text += `${this.lancamento.complemento05} `;
      }
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
