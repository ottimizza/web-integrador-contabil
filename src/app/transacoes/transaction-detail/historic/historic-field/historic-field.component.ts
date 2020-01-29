import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Lancamento } from '@shared/models/Lancamento';

@Component({
  selector: 'app-historic-field',
  templateUrl: './historic-field.component.html'
})
export class HistoricFieldComponent {

  @Input() name: string;
  @Input() lancamento: Lancamento;
  @Output() selectOne = new EventEmitter();
  array: string[];

  devolve(event: any): void {
    this.selectOne.emit(event.target.value);
  }

  protected get values(): string[] {
    this.array = [];
    if (!this.lancamento) {
      this.array = [
        '',
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
        'Complemento 05'
      ];
    } else {
      const l = this.lancamento;
      this.array.push('');
      this._verifyAndPush(l.descricao, 'Fornecedor');
      this._verifyAndPush(l.portador, 'Portador');
      this._verifyAndPush(l.dataMovimento, 'Data');
      this._verifyAndPush(l.valorOriginal, 'Valor');
      this._verifyAndPush(l.documento, 'Documento');
      this._verifyAndPush(l.nomeArquivo, 'Nome do Arquivo');
      this._verifyAndPush(l.tipoPlanilha, 'Tipo da Planilha');
      this._verifyAndPush(l.complemento01, 'Complemento 01');
      this._verifyAndPush(l.complemento02, 'Complemento 02');
      this._verifyAndPush(l.complemento03, 'Complemento 03');
      this._verifyAndPush(l.complemento04, 'Complemento 04');
      this._verifyAndPush(l.complemento05, 'Complemento 05');
    }
    return this.array;
  }

  private _verifyAndPush(verify: any, push: string) {
    if (verify) {
      this.array.push(push);
    }
  }

}
