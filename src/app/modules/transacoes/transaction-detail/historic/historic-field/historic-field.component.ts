import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Lancamento } from '@shared/models/Lancamento';
import { DateUtils } from '@shared/utils/date-utils';

@Component({
  selector: 'app-historic-field',
  templateUrl: './historic-field.component.html',
  styleUrls: ['./historic-field.component.scss']
})
export class HistoricFieldComponent {

  @Input() name: string;
  @Input() lancamento: Lancamento;
  @Output() selectOne = new EventEmitter();
  array: string[];

  devolve(event: any): void {
    this.selectOne.emit(event.target.value);
  }

  get values(): string[] {
    this.array = [];
    if (!this.lancamento) {
      this.array = [
        '',
        'Fornecedor',
        'Portador',
        'Competência',
        'Competência Anterior',
        'Valor',
        'Documento',
        'Complemento 01',
        'Complemento 02',
        'Complemento 03',
        'Complemento 04',
        'Complemento 05'
      ];
      if (this.isExtract) {
        this.array = [
          '',
          'Fornecedor',
          'Portador',
          'Competência',
          'Competência Anterior',
          'Valor',
          'Documento',
          'Complemento 02',
        ];
      }
    } else {
      const l = this.lancamento;
      this.array.push('');

      let localArray: { property: string, text: string }[] = [
        { property: l.descricao, text: 'Fornecedor' },
        { property: l.portador, text: 'Portador' },
        { property: DateUtils.ymdToCompetence(l.dataMovimento), text: 'Competência' },
        { property: DateUtils.lastCompetence(DateUtils.ymdToCompetence(l.dataMovimento)), text: 'Competência Anterior' },
        { property: `${l.valorOriginal}`, text: 'Valor' },
        { property: l.documento, text: 'Documento' },
        { property: l.complemento01, text: 'Complemento 01' },
        { property: l.complemento02, text: 'Complemento 02' },
        { property: l.complemento03, text: 'Complemento 03' },
        { property: l.complemento04, text: 'Complemento 04' },
        { property: l.complemento05, text: 'Complemento 05' }
      ];

      if (this.isExtract) {
        localArray = [
          { property: l.descricao, text: 'Fornecedor' },
          { property: l.portador, text: 'Portador' },
          { property: DateUtils.ymdToCompetence(l.dataMovimento), text: 'Competência' },
          { property: DateUtils.lastCompetence(DateUtils.ymdToCompetence(l.dataMovimento)), text: 'Competência Anterior' },
          { property: `${l.valorOriginal}`, text: 'Valor' },
          { property: l.documento, text: 'Documento' },
          { property: l.complemento02, text: 'Complemento 02' },
       ];
      }

      localArray.forEach(arrItem => {
        this._verifyAndPush(arrItem.property, arrItem.text);
      });
    }
    return this.array;
  }

  private _verifyAndPush(verify: string, push: string) {
    if (verify) {
      this.array.push(push);
    }
  }

  get isExtract() {
    return (this.lancamento.tipoMovimento === 'EXCRE' || this.lancamento.tipoMovimento === 'EXDEB');
  }

}
