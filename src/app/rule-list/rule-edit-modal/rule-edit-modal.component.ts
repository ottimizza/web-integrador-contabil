import { Component, Inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RuleCreateFormat, PostFormatRule, Condicao } from '@shared/models/Rule';

@Component({
  templateUrl: './rule-edit-modal.component.html',
  styleUrls: ['./rule-edit-modal.component.scss']
})
export class RuleEditModalComponent implements OnInit {

  ruleDefault: RuleCreateFormat;

  constructor(
    public dialogRef: MatDialogRef<RuleEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { regras: PostFormatRule[], cnpjContabilidade: string, cnpjEmpresa: string, contaMovimento: string }
  ) { }

  ngOnInit(): void {
    // ! O array local deve ser gerado desta forma ou através de algum outro método que gere UM NOVO array.
    const localArray: PostFormatRule[] = [];
    this.data.regras.forEach(rule => {
      localArray.push(rule);
    });

    this.ruleDefault = new RuleCreateFormat(localArray, this.data.cnpjEmpresa, this.data.cnpjContabilidade, this.data.contaMovimento);
  }

  get info() {
    return {
      remove: 'Remover esta linha da regra'
    };
  }

  fieldChange(event: any, index: number) {
    this.ruleDefault.regras[index].campo = event.target.value;
  }

  conditionChange(event: any, index: number) {
    this.ruleDefault.regras[index].condicao = event.target.value;
  }

  valueChange(event: any, index: number) {
    this.ruleDefault.regras[index].valor = event.target.value;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  remove(id: number) {
    this.ruleDefault.regras.splice(id, 1);
  }

  get conditon() {
    return Condicao;
  }

}
