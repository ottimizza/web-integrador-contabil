import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { LancamentoService } from '@shared/services/lancamento.service';
import { Lancamento } from '@shared/models/Lancamento';
import { RuleGridComponent } from './rule-creator/rule-grid.component';
import { Empresa } from '@shared/models/Empresa';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { Rule } from '@shared/models/Rule';
import { HistoricComponent } from './historic/historic.component';
import { ArrayUtils } from '@shared/utils/array.utils';
import { throwIfAlreadyLoaded } from '@app/guard/module-import.guard';

@Component({
  selector: 'app-tdetail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit, OnChanges {

  @Input() business: Empresa;
  records: Lancamento[] = [];
  id = 0;
  account: string;
  conditions = new Rule();
  suggestions: string[];
  ruleSelected = false;
  pageInfo: PageInfo;
  destroy: boolean;
  errorText: string;
  errorText2: string;
  page = 0;
  impact = 0;
  remaining: number;
  gridArray: Lancamento[];
  tabsInfo: string[];


  constructor(
    // tslint:disable: variable-name
    private _service: LancamentoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.controllInit();
    this.tabsInfo = [
      'btn btn-light col',
      'btn btn-outline-light col',
      'btn btn-outline-light col',
      'btn btn-outline-light col'
    ];
  }

  public ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        switch (key) {
          case 'business':
            this.controllInit();
            break;
        }
      }
    }
  }

  controllInit() {
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

  getComplementos() {
    /*
     * Transforma todos os complementos em um objeto legível para os componentes filhos
     * (para o componente dos chips especificamente)
     */
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

  resetErrors(errors?: string[]) {
    if (errors && errors.length === 1) {
      this.errorText = errors[0];
      this.errorText2 = null;
    } else if (errors && errors.length > 1) {
      this.errorText = errors[0];
      this.errorText2 = errors[1];
    } else {
      this.errorText = null;
      this.errorText2 = null;
    }
  }

  regra() {
    const observable = this._service.saveAsDePara(this.records[0], this.account);
    const verifications = [(this.account && this.account.length > 0), this.conditions.verify()];
    const errors = [
      'Para salvar o lançamento em uma regra customizada você deve informar uma conta contábil.',
      'Para salvar o lançamento em uma regra customizada você deve informar as condições da regra.'
    ];
    this._savePattern(observable, verifications, errors);
  }

  ignorar() {
    const observable = this._service.ignoreLancamento(this.records[0]);
    const verification = this.conditions.verify();
    const error = ['Para salvar um lançamento dentro de uma regra de ignorar, você deve informar as condições da regra.'];
    this._savePattern(observable, [verification], error);
  }

  fornecedor() {
    const observable = this._service.saveAsDePara(this.records[0], this.account);
    const verification = this.account && this.account.length > 0;
    const error = ['Para salvar o lançamento para uma conta de fornecedor, você deve informar uma conta.'];
    this._savePattern(observable, [verification], error);
  }

  private _savePattern(obs: Observable<Lancamento>, verifications: boolean[], errors: string[]) {

    const verify = ArrayUtils.verify(verifications);

    if (verify) {
      this.openHistoric();
      obs.subscribe(() => {
        this._disable();
      });
    } else if ((verifications.length === 1) || (verifications.length > 1 && !verifications[0] && verifications[1])) {
      this.resetErrors([errors[0]]);
    } else if (verifications.length > 1 && verifications[0] && !verifications[1]) {
      this.resetErrors([errors[1]]);
    } else {
      this.resetErrors(errors);
    }
  }

  onDevolve(event: any) {
    if (event.title === 'Fornecedor') {
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
    this.getByRule();
  }

  getByRule() {
    const rules = this.conditions.rules;
    if (rules.length > 0) {
      const subs = this._service
        .getByRule(rules, this.business)
        .subscribe(data => {
          this.gridArray = data.records;
          this.impact = data.pageInfo.totalElements;
          subs.unsubscribe();
        });
    } else {
      this.impact = 0;
    }
  }

  activate() {
    this.ruleSelected = this.conditions.verify();
  }

  openGrid(): void {
    const dialogRef = this.dialog.open(RuleGridComponent, {
      maxWidth: '1400px',
      width: '95vw',
      data: {
        table: this.gridArray
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openHistoric(): void {
    const dialogRef = this.dialog.open(HistoricComponent, {
      maxWidth: '1400px',
      width: '90vw',
      data: {
        lancamento: this.records[0]
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  pag() {
    this.tabsPattern(0);
  }

  expag() {
    this.tabsPattern(1);
  }

  rec() {
    this.tabsPattern(2);
  }

  exrec() {
    this.tabsPattern(3);
  }

  tabsPattern(position: number) {
    this.tabsInfo.forEach(tab => {
      this.tabsInfo[this.tabsInfo.indexOf(tab)] = 'btn btn-outline-light col';
    });
    this.tabsInfo[position] = 'btn btn-light col';
  }

  private _disable() {
    // Reseta todas as variáveis locais após executar uma ação para permitir
    // que a próxima ação esteja pronta para ser executada.
    this.destroy = true;
    this.resetConditions();
    this.ruleSelected = false;
    this.account = null;
    this._next();
  }

  private async _next() {
    if (this.id === 0) {
      this._nextPage();
    } else {
      this.records.splice(0, 1);
      await this._delay(200);
      this._remaining();
      this.destroy = false;
    }
    this.id++;
    if (this.pageInfo && this.id + 1 >= this.pageInfo.pageSize) {
      this.id = 0;
    }
    this.resetErrors();

  }

  private _remaining() {
    if (this.pageInfo) {
      this.remaining = this.pageInfo.totalElements;
    }
    // console.log(this.remaining)
    // Conferir a eficacia deste método
  }

  private _delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private _nextPage() {
    this._service.getLancamentos(this.page, this.business).subscribe(imports => {
      this.records = imports.records;
      this.pageInfo = imports.pageInfo;
      this._remaining();
      this.destroy = false;
      this.page++;
    });
  }

  private resetConditions() {
    this.conditions = new Rule();
  }
}
