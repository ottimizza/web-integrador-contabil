import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Lancamento } from '@shared/models/Lancamento';

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

      const localArray: { property: string, text: string }[] = [
        { property: l.descricao, text: 'Fornecedor' },
        { property: l.portador, text: 'Portador' },
        { property: l.dataMovimento, text: 'Data' },
        { property: `${l.valorOriginal}`, text: 'Valor' },
        { property: l.nomeArquivo, text: 'Nome do Arquivo' },
        { property: l.tipoPlanilha, text: 'Tipo da Planilha' },
        { property: l.complemento01, text: 'Complemento 01' },
        { property: l.complemento02, text: 'Complemento 02' },
        { property: l.complemento03, text: 'Complemento 03' },
        { property: l.complemento04, text: 'Complemento 04' },
        { property: l.complemento05, text: 'Complemento 05' },
      ];

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

}
