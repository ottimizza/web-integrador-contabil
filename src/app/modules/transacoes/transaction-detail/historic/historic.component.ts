import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lancamento } from '@shared/models/Lancamento';
import { Historic } from '@shared/models/Historic';
import { DateUtils } from '@shared/utils/date-utils';
import { HistoricService } from '@shared/services/historic.service';

@Component({
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  fields: any[];
  lancamento: Lancamento;
  historicObj: Historic;

  constructor(
    public dialogRef: MatDialogRef<HistoricComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: HistoricService
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
  }

  onNoClick() {
    this.dialogRef.close();
  }

  get isExtract() {
    return (this.lancamento.tipoMovimento === 'EXDEB' || this.lancamento.tipoMovimento === 'EXCRE');
  }

  date(): string {
    const dates = this.lancamento.dataMovimento.split('-');
    return `${dates[2]}/${dates[1]}/${dates[0]}`;
  }

  get params(): string {
    let params: string;
    if (this.historicObj.id) {
      params = `Código: ${this.historicObj.id}. ${this.historicObj.preview}`;
    } else {
      params = this.historicObj.preview;
    }
    return params;
  }

  private getValues(combo: string): string {
    const l = this.lancamento;
    const results = [
      l.descricao,
      l.portador,
      DateUtils.ymdToCompetence(l.dataMovimento),
      DateUtils.lastCompetence(DateUtils.ymdToCompetence(l.dataMovimento)),
      l.documento,
      // l.tipoPlanilha,
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
      'competencia',
      'competenciaAnterior',
      'documento',
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
        'Banco',
        'Competência Atual',
        'Competência Anterior',
        'Documento',
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

  submit() {
    if (!this.params) {
      this.dialogRef.close();
      return;
    }
    const l = this.lancamento;
    const historic = this.historicObj.historic(l.contaMovimento, l.cnpjEmpresa, l.cnpjContabilidade, l.tipoLancamento, l.idRoteiro);
    this.service.createHistoric(historic).subscribe((results: any) => {
      // this.service.export(results.record.id, results.record).subscribe();
      this.dialogRef.close(true);
    });
  }

}
