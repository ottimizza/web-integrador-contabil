import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RuleCreateFormat, PostFormatRule, Condicao } from '@shared/models/Rule';
import { CompleteRule } from '@shared/models/CompleteRule';
import { User } from '@shared/models/User';
import { FormGroup, FormControl } from '@angular/forms';
import { EntryUtils } from '@shared/utils/entry.utils';
import { MatSelectChange } from '@angular/material';

@Component({
  templateUrl: './rule-edit-modal.component.html',
  styleUrls: ['./rule-edit-modal.component.scss']
})
export class RuleEditModalComponent implements OnInit {

  ruleDefault: CompleteRule;
  errorText: string;
  currentUser: User;

  source = [
    'descricao',
    'documento',
    'portador',
    'complemento01',
    'complemento02',
    'complemento03',
    'complemento04',
    'complemento05',
    'tipoPlanilha',
    'nomeArquivo',
  ];

  constructor(
    public dialogRef: MatDialogRef<RuleEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { rule: CompleteRule }
  ) { }

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
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

  parseDataSource = (val: string) => EntryUtils.fromTo(val, { tipoLancamento: this.ruleDefault.tipoLancamento });
  parseConditionSource = (val: Condicao) => {
    switch (val) {
      case Condicao.COMECAO_COM: return 'Começa com';
      case Condicao.CONTEM:      return 'Contém';
      case Condicao.IGUAL:       return 'Igual a';
      case Condicao.NAO_CONTEM:  return 'Não contém';
    }
  }

  get info() {
    return {
      remove: 'Remover esta cláusula da regra',
      add: 'Adicionar uma nova cláusula à regra'
    };
  }

  add() {
    this.ruleDefault.regras.push({ campo: null, condicao: null, grupoRegra: null, id: null, valor: null });
  }

  fieldChange(event: MatSelectChange, index: number) {
    this.ruleDefault.regras[index].campo = event.value;
  }

  conditionChange(event: MatSelectChange, index: number) {
    this.ruleDefault.regras[index].condicao = event.value;
  }

  valueChange(event: any, index: number) {
    this.ruleDefault.regras[index].valor = event.target.value;
  }

  remove(id: number) {
    this.ruleDefault.regras.splice(id, 1);
  }

  controlBuilder(defaultValue: any) {
    return new FormControl(defaultValue);
  }

  save() {
    if (this.ruleDefault.contaMovimento && this.ruleDefault.contaMovimento.length) {
      let verify = true;
      this.ruleDefault.regras.forEach(rule => {
        if (!rule.campo || !rule.campo.length) {
          verify = false;
          this.errorText = 'Preencha todos os campos de regra';
        } else if (!rule.condicao) {
          verify = false;
          this.errorText = 'Preencha todos os campos de regra';
        } else if (!rule.valor || !rule.valor.length) {
          verify = false;
          this.errorText = 'Preencha todos os campos de regra';
        }
      });
      if (verify) {
        this.errorText = null;
        this.dialogRef.close(this.ruleDefault);
      } else {
        this.errorText = 'Preencha todos os campos de regra';
      }
    } else {
      this.errorText = 'Insira uma conta movimento';
    }
  }

}

