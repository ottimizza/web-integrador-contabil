import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-historic-field',
  templateUrl: './historic-field.component.html'
})
export class HistoricFieldComponent {

  @Input() name: string;
  @Output() change = new EventEmitter();

  devolve(event: any): void {
    this.change.emit(event.target.value);
  }

  protected get values(): string[] {
    return [
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
  }

}
