import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { LancamentoService } from '@shared/services/lancamento.service';
import { Lancamento } from '@shared/models/Lancamento';
import { PageInfo } from '@shared/models/ImportacaoLancamentosRequest';
import { RuleGridComponent } from './rule-creator/rule-grid.component';

@Component({
  selector: 'app-tdetail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  records: Lancamento[] = [];
  id = 0;
  account: string;
  conditions: any;
  suggestions: string[];
  ruleSelected = false;
  pageInfo: PageInfo;
  elementsQuant = 0;
  destroy: boolean;
  errorText: string;
  errorText2: string;
  page = 0;

  constructor(
    // tslint:disable: variable-name
    private _service: LancamentoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.resetConditions();
    this._next();
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
      general:
        `Clique nas palavras que indicam o motivo da movimentação ser ignorada ou atribuída a uma determinada conta contábil.
        Depois informe a conta ou selecione uma das sugeridas, ou informe que esta regra deve ser ignorada.`,
      progressBar: `${this.percentage}% de ${this.elements}`,
      account: 'Insira neste campo, a conta relativa a este lançamento ou selecione uma das sugeridas.',
      rule: 'A conta informada deve ser aplicada em todas as ocorrências da regra selecionada.',
      ignore: 'Todos os lançamentos com a regra seleciona serão ignorados.',
      skip: 'Selecione esta opção caso você não consiga preencher sózinho ou não tenha os dados necessários no momento.',
      ok: 'Salvar a regra selecionada para uma conta contábil ou ignorar todos os lançamentos que se encaixem nesta regra.',
      cancel: 'Voltar à barra de opções anterior.',
      affecteds: 'Clique aqui para visualizar os lançamentos afetados.',
      provider: 'A conta informada será aplicada para todas as ocorrências deste fornecedor.'
    };
  }

  get percentage() {
    return ((this.elementsQuant / this.elements) * 100).toFixed(2);
  }

  getComplementos() {
    const lancamento = this.records[0];
    const ok = lancamento.complemento01 || lancamento.complemento02 || lancamento.complemento03 || lancamento.complemento04 || lancamento.complemento05;
    let text = '';
    if (ok) {
      text = JSON.stringify({
        c1: lancamento.complemento01,
        c2: lancamento.complemento02,
        c3: lancamento.complemento03,
        c4: lancamento.complemento04,
        c5: lancamento.complemento05
      });
    }

    return {
      ok,
      text
    };
  }

  get impact() {
    return {
      impact: 18,
      remaining: 122
    };
  }

  resetErrors() {
    this.errorText = null;
    this.errorText2 = null;
  }

  regra() {
    this.resetErrors();
    if (this.account && this.verifyConditions()) {
      this._service
        .saveAsDePara(this.records[0], this.account)
        .subscribe(data => {
          this.destroy = true;
          this._disable();
        });
    } else if (this.account) {
      this.errorText = 'Para salvar o lançamento em uma regra customizada você deve informar as condições da regra.';
    } else if (this.verifyConditions()) {
      this.errorText = 'Para salvar o lançamento em uma regra customizada você deve informar uma conta contábil.';
    } else {
      this.errorText = 'Para salvar o lançamento em uma regra customizada você deve informar as condições da regra.';
      this.errorText2 = 'Para salvar o lançamento em uma regra customizada você deve informar uma conta contábil.';
    }
  }

  fornecedor() {
    this.resetErrors();
    if (this.account && this.account.length > 0) {
      this._service
        .saveAsDePara(this.records[0], this.account)
        .subscribe(data => {
          this.destroy = true;
          this._disable();
        });
    } else {
      this.errorText = 'Para salvar o lançamento para uma conta de fornecedor, você deve informar uma conta.';
    }
  }

  onDevolve(event: any) {
    if (event.title === 'Data') {
      this.conditions.dataMovimento = event.selecteds;
    } else if (event.title === 'Valor') {
      this.conditions.valorOriginal = event.selecteds;
    } else if (event.title === 'Fornecedor') {
      this.conditions.descricao = event.selecteds;
    } else if (event.title === 'Documento') {
      this.conditions.documento = event.selecteds;
    } else if (event.title === 'Banco') {
      this.conditions.portador = event.selecteds;
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
    this.resetErrors();
    if (this.verifyConditions()) {
      this._service
        .ignoreLancamento(this.records[0])
        .subscribe(data => {
          console.log(data);
          console.log(this.conditions);
          this.destroy = true;
          this._disable();
      });
    } else {
      this.errorText = 'Para salvar um lançamento dentro de uma regra de ignorar, você deve informar as condições da regra';
    }
  }

  affecteds() {
    return 120;
  }

  activate() {
    if (this.verifyConditions()) {
      this.ruleSelected = true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RuleGridComponent, {
      maxWidth: '1400px',
      width: '95vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private get elements() {
    let totalElements = 0;
    if (this.pageInfo) {
      totalElements = this.pageInfo.totalElements;
    }
    return totalElements;
  }

  private _disable() {
    // Reseta todas as variáveis locais após executar uma ação para permitir
    // que a próxima ação esteja pronta para ser executada.
    this.resetConditions();
    this.ruleSelected = false;
    this.account = null;
    this._next();
  }

  private async _next() {
    if (this.id === 0) {
      this._nextPage();
      this.page++;
    } else {
      this.records.splice(0, 1);
      await this._delay(200);
      this.destroy = false;
    }
    this.id++;
    if (this.pageInfo && this.id + 1 >= this.pageInfo.pageSize) {
      this.id = 0;
    }
    this.resetErrors();

  }

  private _newerPage() {
    if (this.pageInfo.hasNext) {
      this.page++;
    } else {
      this.page = 0;
      this.errorText = 'Não há mais lançamentos pendentes envolvendo esta empresa';
    }
  }

  private _delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private _nextPage() {
    console.log(this.page);
    this._service.getLancamentos(this.page).subscribe(imports => {
      this.records = imports.records;
      this.pageInfo = imports.pageInfo;
      this.destroy = false;
    });
  }

  private verifyConditions() {
    return (
      this.conditions.dataMovimento ||
      this.conditions.valorOriginal ||
      this.conditions.descricao ||
      this.conditions.documento ||
      this.conditions.portador ||
      this.conditions.complemento01 ||
      this.conditions.complemento02 ||
      this.conditions.complemento03 ||
      this.conditions.complemento04 ||
      this.conditions.complemento05 ||
      this.conditions.tipoPlanilha ||
      this.conditions.nomeArquivo
    );
  }

  private resetConditions() {
    this.conditions = {
      dataMovimento: undefined,
      valorOriginal: undefined,
      descricao: undefined,
      documento: undefined,
      portador: undefined,
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
