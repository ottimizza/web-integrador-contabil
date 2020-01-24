import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { LancamentoService } from '@shared/services/lancamento.service';
import { Lancamento } from '@shared/models/Lancamento';
import { RuleGridComponent } from './rule-creator/rule-grid.component';
import { Empresa } from '@shared/models/Empresa';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { Rule, RuleCreateFormat } from '@shared/models/Rule';
import { HistoricComponent } from './historic/historic.component';
import { ArrayUtils } from '@shared/utils/array.utils';
import { RuleService } from '@shared/services/rule.service';
import { HistoricService } from '@shared/services/historic.service';

@Component({
  selector: 'app-tdetail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
// export class TransactionDetailComponent implements OnInit, OnChanges {

  @Input() business: Empresa;
  @Output() tabSelect = new EventEmitter();
  records: Lancamento[] = [];
  id = 0;
  account: string;
  conditions = new Rule();
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
  tipoLancamento = 'PAG';
  tipoMovimento = 1;
  tabIsClicked = false;


  constructor(
    // tslint:disable: variable-name
    private _lancamentoService: LancamentoService,
    private _ruleService: RuleService,
    private _historicService: HistoricService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.controllInit();
    this.tabsInfo = [
      'btn btn-outline-link col',
      'btn btn-outline-link col',
      'btn btn-outline-link col',
      'btn btn-outline-link col'
    ];
  }

  // public ngOnChanges(changes: SimpleChanges) {
  //   for (const key in changes) {
  //     if (changes.hasOwnProperty(key)) {
  //       switch (key) {
  //         case 'business':
  //           this.controllInit();
  //           break;
  //       }
  //     }
  //   }
  // }

  // controllInit() {
  //   this.id = 0;
  //   this.conditions = new Rule();
  //   this._next();
  // }

  get suggestions() {
    if (this.records.length > 0 && this.records[0].contaSugerida) {
      const account = this.records[0].contaSugerida;
      if (account === 'null' || account === 'IGNORAR') {
        return '';
      } else {
        return account;
      }
    } else {
      return '';
    }
  }

  get info() {
    return {
      account: 'Insira neste campo, a conta relativa a este lançamento ou selecione uma das sugeridas.',
      rule: 'A conta informada deve ser aplicada em todas as ocorrências da regra selecionada.',
      ignore: 'Todos os lançamentos com a regra seleciona serão ignorados.',
      skip: 'Envie este lançamento para o final da lista.',
      ok: 'Salvar a regra selecionada para uma conta contábil ou ignorar todos os lançamentos que se encaixem nesta regra.',
      cancel: 'Voltar à barra de opções anterior.',
      affecteds: 'Clique aqui para visualizar os lançamentos afetados.',
      provider: 'A conta informada será aplicada para todas as ocorrências deste fornecedor.',
      info: `Agora clique nas palavras que justificam o lançamento ser aplicado a determinada conta ou ignorado.
      Se necessário, informe a conta.`
    };
  }

  getComplementos() {
    /*
     * Transforma todos os complementos em um objeto legível para os componentes filhos
     * (para o componente dos chips especificamente)
     */
    const lancamento = this.records[0];
    const arquivo = lancamento.arquivo;
    const ok = (lancamento.complemento01 && arquivo.labelComplemento01) ||
               (lancamento.complemento02 && arquivo.labelComplemento02) ||
               (lancamento.complemento03 && arquivo.labelComplemento03) ||
               (lancamento.complemento04 && arquivo.labelComplemento04) ||
               (lancamento.complemento05 && arquivo.labelComplemento05);
    let text = '';
    if (ok) {
      text = JSON.stringify({
        c1: lancamento.complemento01,
        c2: lancamento.complemento02,
        c3: lancamento.complemento03,
        c4: lancamento.complemento04,
        c5: lancamento.complemento05,
        l1: arquivo.labelComplemento01,
        l2: arquivo.labelComplemento02,
        l3: arquivo.labelComplemento03,
        l4: arquivo.labelComplemento04,
        l5: arquivo.labelComplemento05
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

  pular() {
    this._next();
  }

  regra() {
    const regra = new RuleCreateFormat(
      this.conditions.rules,
      this.business.cnpj,
      this.account
    );
    const observable = this._ruleService.createRule(regra);
    const verifications = [(this.account && this.account.length > 0), this.conditions.verify()];
    const errors = [
      'Para salvar o lançamento em uma regra customizada você deve informar uma conta contábil.',
      'Para salvar o lançamento em uma regra customizada você deve informar as condições da regra.'
    ];
    this._savePattern(observable, verifications, errors, true);
  }

  ignorar() {
    const observable = this._lancamentoService.ignoreLancamento(this.records[0]);
    const verification = this.conditions.verify();
    const error = ['Para salvar um lançamento dentro de uma regra de ignorar, você deve informar as condições da regra.'];
    this._savePattern(observable, [verification], error);
  }

  fornecedor() {
    const observable = this._lancamentoService.saveAsDePara(this.records[0], this.account);
    const verification = this.account && this.account.length > 0;
    const error = ['Para salvar o lançamento para uma conta de fornecedor, você deve informar uma conta.'];
    this._savePattern(observable, [verification], error);
  }

  private _savePattern(obs: Observable<Lancamento>, verifications: boolean[], errors: string[], rule?: boolean) {

    const verify = ArrayUtils.verify(verifications);

    if (verify) {
      if (rule) {
        this._historicService
          .getHistoric(this.business, this.account)
          .subscribe(data => {
            if (data.records.length === 0) {
              this.openHistoric(obs);
            } else {
              this._subsAndDisable(obs);
            }
          });
      } else {
        this._subsAndDisable(obs);
      }
    } else if ((verifications.length === 1) || (verifications.length > 1 && !verifications[0] && verifications[1])) {
      this.resetErrors([errors[0]]);
    } else if (verifications.length > 1 && verifications[0] && !verifications[1]) {
      this.resetErrors([errors[1]]);
    } else {
      this.resetErrors(errors);
    }
  }

  private _subsAndDisable(obs: Observable<any>) {
    obs.subscribe(() => {
      this._disable();
    });
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
      console.log(rules);
      const subs = this._lancamentoService
        .getByRule(rules, this.business)
        .subscribe(data => {
          console.log(data);
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

  openHistoric(obs: Observable<Lancamento>): void {
    const dialogRef = this.dialog.open(HistoricComponent, {
      maxWidth: '900px',
      width: '90vw',
      data: {
        lancamento: this.records[0]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this._subsAndDisable(obs);
    });
  }

  pag() {
    this.tabsPattern(0, 1, 'PAG');
  }

  expag() {
    this.tabsPattern(1, 1, 'EXPAG');
  }

  rec() {
    this.tabsPattern(2, 1, 'REC');
  }

  exrec() {
    this.tabsPattern(3, 1, 'EXREC');
  }

  tabsPattern(position: number, tipoMovimento: number, tipoLancamento: string) {
    this.tabsInfo.forEach(tab => {
      this.tabsInfo[this.tabsInfo.indexOf(tab)] = 'btn btn-outline-link col';
    });
    this.tabsInfo[position] = 'btn btn-light col';
    this.tabIsClicked = true;
    this.tabSelect.emit('true');

    this.tipoLancamento = tipoLancamento;
    this.tipoMovimento = tipoMovimento;
    this.id = 0;
    this.page = 0;
    this._nextPage();
  }

  private _disable() {
    // Reseta todas as variáveis locais após executar uma ação para permitir
    // que a próxima ação esteja pronta para ser executada.
    this.destroy = true;
    this.conditions = new Rule();
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
      this.remaining = this.pageInfo.totalElements - (this.id + 1);
    }

    // console.log(this.remaining)
    // Conferir a eficacia deste método
  }

  private _delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private _nextPage() {
    this._lancamentoService.getLancamentos(this.page, this.business, this.tipoLancamento, this.tipoMovimento).subscribe(imports => {
      // console.log(imports);
      console.log(imports);
      this.records = imports.records;
      this.pageInfo = imports.pageInfo;
      this._remaining();
      this.destroy = false;
      this.page++;
    });
  }
}
