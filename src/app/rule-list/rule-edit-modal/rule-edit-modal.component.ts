import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RuleCreateFormat, PostFormatRule, Condicao } from '@shared/models/Rule';
import { CompleteRule } from '@shared/models/CompleteRule';

@Component({
  templateUrl: './rule-edit-modal.component.html',
  styleUrls: ['./rule-edit-modal.component.scss']
})
export class RuleEditModalComponent implements OnInit {

  ruleDefault: CompleteRule;

  constructor(
    public dialogRef: MatDialogRef<RuleEditModalComponent>,
    // tslint:disable-next-line: max-line-length
    @Inject(MAT_DIALOG_DATA) public data: { rule: CompleteRule }
  ) { }

  ngOnInit(): void {
    // ! O array local PRECISA ser feito desta forma ou de alguma outra que crie um NOVO array
    const rule = this.data.rule;
    const localArray = rule.regras.filter(() => true);
    this.ruleDefault = new CompleteRule(
      rule.id,
      rule.posicao,
      rule.contaMovimento,
      rule.tipoLancamento,
      rule.idRoteiro,
      rule.cnpjEmpresa,
      rule.cnpjContabilidade,
      rule.dataCriacao,
      rule.dataAtualizacao,
      localArray
    );
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
