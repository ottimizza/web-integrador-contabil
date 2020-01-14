import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Lancamento } from '@shared/models/Lancamento';
import { LancamentoService } from '@app/services/lancamentos.service';

@Component({
  selector: 'app-tdetail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  record: Lancamento;
  id: number;
  conta: string;
  conditions: any;
  suggestions: string[];
  ruleSelected = false;
  totalElements = 0;
  elementsQuant = 0;

  constructor(
    // tslint:disable: variable-name
    private _service: LancamentoService,
    private _route: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._service
      .getLancamentos()
      .subscribe(imports => {
        console.log(imports);
        if (imports.pageInfo.totalElements) {
          this.totalElements = imports.pageInfo.totalElements;
        }
        this.record = imports.records[0];
      });
    this.resetConditions();
    this.suggestions = [
      '312321321',
      '735190862',
      '902873038',
      '919591831',
      '423782332'
    ];
  }

  get info() {
    return {
      general: 'Nesta tela, você deve clicar nos campos para selecioná-los. Você pode pular este lançamento ou criar uma regra para os campos selecionados.',
      progressBar: `${this.percentage}% de ${this.totalElements}`,
      account: 'Insira neste campo, a conta contábil relativa a este lançamento ou selecione uma das sugeridas.',
      rule: 'A conta contábil informada deve ser aplicada em todas as ocorrências da regra selecionada.',
      ignore: 'Todos os lançamentos com a regra seleciona serão ignorados.',
      skip: 'Selecione esta opção caso você não consiga preencher sózinho ou não tenha os dados necessários no momento.',
      ok: 'Salvar a regra selecionada para uma conta contábil ou ignorar todos os lançamentos que se encaixem nesta regra.',
      cancel: 'Voltar à barra de opções anterior.',
      affecteds: 'Clique aqui para visualizar os lançamentos afetados.'
    };
  }

  get percentage() {
    return (this.elementsQuant / this.totalElements) * 100;
  }

  regra() {
    if (this.conta && this.verifyConditions()) {
      console.log(this.conta);
      console.log(this.conditions);
      this._disable();
    }
  }

  onDevolve(event: any) {
    if (event.title === 'Data') {
      this.conditions.data = event.selecteds;
    } else if (event.title === 'Valor') {
      this.conditions.valor = event.selecteds;
    } else if (event.title === 'Fornecedor') {
      this.conditions.fornecedor = event.selecteds;
    } else if (event.title === 'Documento') {
      this.conditions.documento = event.selecteds;
    } else if (event.title === 'Banco') {
      this.conditions.banco = event.selecteds;
    } else if (event.title === 'Complemento 1') {
      this.conditions.complemento01 = event.selecteds;
    } else if (event.title === 'Complemento 2') {
      this.conditions.complemento02 = event.selecteds;
    } else if (event.title === 'Complemento 3') {
      this.conditions.complemento03 = event.selecteds;
    } else if (event.title === 'Complemento 4') {
      this.conditions.complemento04 = event.selecteds;
    } else if (event.title === 'Complemento 5') {
      this.conditions.complemento05 = event.selecteds;
    } else if (event.title === 'Tipo da Planilha') {
      this.conditions.tipoPlanilha = event.selecteds;
    } else if (event.title === 'Nome do Arquivo') {
      this.conditions.nomeArquivo = event.selecteds;
    }
  }

  ignorar() {
    if (this.verifyConditions()) {
      this._disable();
    }
  }

  pular() {
    this._disable();
  }

  affecteds() {
    return 120;
  }

  activate() {
    if (this.verifyConditions()) {
      this.ruleSelected = true;
    }
  }

  private _disable() {
    this.resetConditions();
    this.ruleSelected = false;
    this.conta = null;
  }

  private verifyConditions() {
    return this.conditions.data ||
    this.conditions.valor ||
    this.conditions.fornecedor ||
    this.conditions.documento ||
    this.conditions.banco ||
    this.conditions.complemento01 ||
    this.conditions.complemento02 ||
    this.conditions.complemento03 ||
    this.conditions.complemento04 ||
    this.conditions.complemento05 ||
    this.conditions.tipoPlanilha ||
    this.conditions.nomeArquivo;
  }

  private resetConditions() {
    this.conditions = {
      data: undefined,
      valor: undefined,
      fornecedor: undefined,
      documento: undefined,
      banco: undefined,
      complemento01: undefined,
      complemento02: undefined,
      complemento03: undefined,
      complemento04: undefined,
      complemento05: undefined,
      tipoPlanilha: undefined,
      nomeArquivo: undefined
    };
  }

}
