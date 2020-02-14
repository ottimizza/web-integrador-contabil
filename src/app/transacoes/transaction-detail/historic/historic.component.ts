import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lancamento } from '@shared/models/Lancamento';
import { Historic } from '@shared/models/Historic';

@Component({
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  id: string;
  fields: any[];
  lancamento: Lancamento;
  historicObj: Historic;

  constructor(
    public dialogRef: MatDialogRef<HistoricComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // Define os labels dos campos que serão exibidos
    this.fields = [
      { span: 'Texto Inicial', name: 'Campo 1:' },
      { span: 'Texto 2', name: 'Campo 2:' },
      { span: 'Texto 3', name: 'Campo 3:' },
      { span: 'Texto 4' }
    ];
    this.historicObj = new Historic();
    this.lancamento = this.data.lancamento;
  }

  onChange(event: any, i: number): void {
    if (i === 0) {
      this.historicObj.field1.value = this.getValues(event);
      this.historicObj.field1.field = this.dePara(event);
    } else if (i === 1) {
      this.historicObj.field2.value = this.getValues(event);
      this.historicObj.field2.field = this.dePara(event);
    } else if (i === 2) {
      this.historicObj.field3.value = this.getValues(event);
      this.historicObj.field3.field = this.dePara(event);
    }
    this._update();
  }

  onKeyup(event: any, i: number): void {
    if (i === 0) {
      this.historicObj.com1 = event;
    } else if (i === 1) {
      this.historicObj.com2 = event;
    } else if (i === 2) {
      this.historicObj.com3 = event;
    } else if (i === 3) {
      this.historicObj.com4 = event;
    }
    this._update();

  }

  onNoClick() {
    this.dialogRef.close();
  }

  date(): string {
    const dates = this.lancamento.dataMovimento.split('-');
    return `${dates[2]}/${dates[1]}/${dates[0]}`;
  }

  get params(): string {
    let params: string;
    if (this.id) {
      params = `ID do Histórico: ${this.id}. ${this.historicObj.preview}`;
    } else {
      params = this.historicObj.preview;
    }
    return params;
  }

  private _update(): void {
    this.historicObj.id = this.id;
    const l = this.lancamento;
    this.data.regra = this.historicObj.historic(l.contaMovimento, l.cnpjEmpresa, l.cnpjContabilidade);
  }

  private getValues(combo: string): string {
    const l = this.lancamento;
    const results = [
      l.descricao,
      l.portador,
      this.date(),
      l.valorOriginal ? `${l.valorOriginal}` : null,
      l.documento,
      l.nomeArquivo,
      l.tipoPlanilha,
      l.complemento01,
      l.complemento02,
      l.complemento03,
      l.complemento04,
      l.complemento05
    ];
    return this.ifChainPattern(results, combo);
  }

  private dePara(property: string): string {
    const results = [
      'descricao',
      'portador',
      'dataMovimento',
      'valorOriginal',
      'documento',
      'nomeArquivo',
      'tipoPlanilha',
      'complemento01',
      'complemento02',
      'complemento03',
      'complemento04',
      'complemento05'
    ];

    return this.ifChainPattern(results, property);
  }

  private ifChainPattern(results: string[], property: string): string {
      const array = [
        'Fornecedor',
        'Portador',
        'Data',
        'Valor',
        'Documento',
        'Nome do Arquivo',
        'Tipo da Planilha',
        'Complemento 01',
        'Complemento 02',
        'Complemento 03',
        'Complemento 04',
        'Complemento 05',
      ];
      let text = '';
      array.forEach(prop => {
        if (prop === property) {
          text = results[array.indexOf(prop)];
        }
      });
      return text;
  }

}
