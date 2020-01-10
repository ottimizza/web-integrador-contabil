import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './rule-creator.component.html'
})
export class RuleCreatorComponent {

  @Input() conta: string;
  gridIsOn: boolean;
  dates: string[];
  valor: string[];
  fornecedor: string[];
  documento: string[];
  banco: string[];
  complemento01: string[];
  complemento02: string[];
  complemento03: string[];
  complemento04: string[];
  complemento05: string[];
  tipoPlanilha: string[];
  nomeArquivo: string[];

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
    } else if (event.title === 'Complemento 1') {
      this.complemento01 = event.selecteds;
    } else if (event.title === 'Complemento 2') {
      this.complemento02 = event.selecteds;
    } else if (event.title === 'Complemento 3') {
      this.complemento03 = event.selecteds;
    } else if (event.title === 'Complemento 4') {
      this.complemento04 = event.selecteds;
    } else if (event.title === 'Complemento 5') {
      this.complemento05 = event.selecteds;
    } else if (event.title === 'Tipo da Planilha') {
      this.tipoPlanilha = event.selecteds;
    } else if (event.title === 'Nome do Arquivo') {
      this.nomeArquivo = event.selecteds;
    }


    this.data.regra = {
      data: this.dates ? this.dates : undefined,
      valor: this.valor ? this.valor : undefined,
      fornecedor: this.fornecedor ? this.fornecedor : undefined,
      documento: this.documento ? this.documento : undefined,
      banco: this.banco ? this.banco : undefined,
      complemento01: this.complemento01 ? this.complemento01 : undefined,
      complemento02: this.complemento02 ? this.complemento02 : undefined,
      complemento03: this.complemento03 ? this.complemento03 : undefined,
      complemento04: this.complemento04 ? this.complemento04 : undefined,
      complemento05: this.complemento05 ? this.complemento05 : undefined,
      tipoPlanilha: this.tipoPlanilha ? this.tipoPlanilha : undefined,
      nomeArquivo: this.nomeArquivo ? this.nomeArquivo : undefined
    };
  }

}
