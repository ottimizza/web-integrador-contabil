import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './rule-creator.component.html'
})
export class RuleCreatorComponent {

  gridIsOn: boolean;
  dates: string[];
  valor: string[];
  fornecedor: string[];
  documento: string[];
  banco: string[];
  complemento: string[];

  constructor(
    public dialogRef: MatDialogRef<RuleCreatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDevolve(event: any) {
    if (event.title === 'Data') {
      this.dates = event.selecteds;
    } else if (event.title === 'Valor') {
      this.valor = event.selecteds;
    } else if (event.title === 'Fornecedor') {
      this.fornecedor = event.selecteds;
    } else if (event.title === 'Documento') {
      this.documento = event.selecteds;
    } else if (event.title === 'Banco') {
      this.banco = event.selecteds;
    } else if (event.title.selecteds === 'Complemento') {
      this.complemento = event.selecteds;
    }

    this.data.regra = {
      data: this.dates ? this.dates : undefined,
      valor: this.valor ? this.valor : undefined,
      fornecedor: this.fornecedor ? this.fornecedor : undefined,
      documento: this.documento ? this.documento : undefined,
      banco: this.banco ? this.banco : undefined,
      complemento: this.complemento ? this.complemento : undefined
    };
  }

}
