import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RuleCreateFormat, PostFormatRule, Condicao } from '@shared/models/Rule';
import { CompleteRule } from '@shared/models/CompleteRule';
import { User } from '@shared/models/User';

@Component({
  templateUrl: './rule-edit-modal.component.html',
  styleUrls: ['./rule-edit-modal.component.scss']
})
export class RuleEditModalComponent implements OnInit {

  ruleDefault: CompleteRule;
  errorText: string;
  currentUser: User;

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

  get info() {
    return {
      remove: 'Remover esta linha da regra',
      add: 'Adicionar uma nova linha à regra'
    };
  }

  add() {
    this.ruleDefault.regras.push({ campo: null, condicao: null, grupoRegra: null, id: null, valor: null });
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

  get conditon() {
    return Condicao;
  }

  get itens(): { value: string, label: string }[] {
    return [
      { value: 'descricao', label: 'Fornecedor' },
      { value: 'documento', label: 'Documento' },
      { value: 'portador', label: 'Banco' },
      { value: 'complemento01', label: 'Complemento 01' },
      { value: 'complemento02', label: 'Complemento 02' },
      { value: 'complemento03', label: 'Complemento 03' },
      { value: 'complemento04', label: 'Complemento 04' },
      { value: 'complemento05', label: 'Complemento 05' },
      { value: 'tipoPlanilha', label: 'Tipo da Planilha' },
      { value: 'nomeArquivo', label: 'Nome do Arquivo' },
      { value: 'tipoMovimento', label: 'Tipo do Movimento' }
    ];
  }

}

