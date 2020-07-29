import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { MatTabChangeEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

import { DEFAULT_CHIP_PATTERN } from './rule-creator/chips-group/patterns/DEFAULT_CHIP_PATTERN';
import { VALUE_CHIP_PATTERN } from './rule-creator/chips-group/patterns/VALUE_CHIP_PATTERN';
import { DATE_CHIP_PATTERN } from './rule-creator/chips-group/patterns/DATE_CHIP_PATTERN';
import { BANK_CHIP_PATTERN } from './rule-creator/chips-group/patterns/BANK_CHIP_PATTERN';
import { RuleConfig } from './rule-creator/chips-group/chips-group.component';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { LancamentoService } from '@shared/services/lancamento.service';
import { RuleGridComponent } from './rule-creator/rule-grid.component';
import { HistoricService } from '@shared/services/historic.service';
import { HistoricComponent } from './historic/historic.component';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { ToastService } from '@shared/services/toast.service';
import { Rule, RuleCreateFormat } from '@shared/models/Rule';
import { RuleService } from '@shared/services/rule.service';
import { ArrayUtils } from '@shared/utils/array.utils';
import { Lancamento } from '@shared/models/Lancamento';
import { Empresa } from '@shared/models/Empresa';

@Component({
  selector: 'app-tdetail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit, GenericPagination {

  @Output() tabSelect = new EventEmitter();
  @Input() business: Empresa;
  pageInfo = PageInfo.defaultPageInfo();
  records: Lancamento[] = [];
  conditions = new Rule();
  tipoMovimento = 'PAG';
  tipoLancamentoName: string;
  errorText2: string;
  errorText: string;
  account: string;
  destroy: boolean;
  tabIsClicked = false;
  tipoConta = 0;
  impact = 0;
  percentage = 0;
  total = 0;

  constructor(
    // tslint:disable
    private _lancamentoService: LancamentoService,
    private _historicService: HistoricService,
    private _ruleService: RuleService,
    private _toast: ToastService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.onTab({ tab: null, index: 0 }, true);
  }

  get tipo() {
    if (this.tipoMovimento === 'PAG' || this.tipoMovimento === 'REC') {
      return 'MOVIMENTO';
    } else {
      return 'EXTRATO';
    }
  }

  get buttonLabel() {
    if (this.tipoMovimento === 'PAG' || this.tipoMovimento === 'EXDEB') {
      return 'Fornecedor';
    } else {
      return 'Cliente';
    }
  }

  get suggestions() {
    if (this.records.length > 0 && this.records[0].contaSugerida) {
      const account = this.records[0].contaSugerida;
        const array = account.split(',');
        for (let i = 0; i < array.length; i++) {
          if (array[i] === 'null' || array[i] === 'IGNORAR') {
            array.splice(i, 1);
          }
        }
        return array
    } else {
      return [];
    }
  }

  get info() {
    return {
      provider: 'A conta informada será aplicada para todas as ocorrências deste fornecedor e qualquer outro campo marcado será ignorado.',
      ok: 'Salvar a regra selecionada para uma conta contábil ou ignorar todos os lançamentos que se encaixem nesta regra.',
      info: 'Selecione os termos que justificam o lançamento ser vinculado a determinada conta ou ser ignorado.',
      account: 'Insira neste campo, a conta relativa a este lançamento ou selecione uma das sugeridas.',
      rule: 'A conta informada deve ser aplicada em todas as ocorrências das palavras selecionada.',
      ignore: 'Todos os lançamentos com as palavras selecionada serão ignorados.',
      affectedsOrientation: 'Lançamentos já parametrizados podem ser afetados',
      affecteds: 'Clique para visualizar os lançamentos afetados.',
      skip: 'Deixar este lançamento para depois.'
    };
  }

  get hasComplements() {
    const l = this.records[0];
    const a = l.arquivo;
    return !!((l.complemento01 && a.labelComplemento01) ||
            (l.complemento02 && a.labelComplemento02) ||
            (l.complemento03 && a.labelComplemento03) ||
            (l.complemento04 && a.labelComplemento04) ||
            (l.complemento05 && a.labelComplemento05));
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

  get ruleCreateFormat() {
    return new RuleCreateFormat(
      this.conditions.rules,
      this.business.cnpj,
      this.records[0].cnpjContabilidade,
      this.records[0].tipoLancamento,
      this.records[0].idRoteiro,
      this.account
    );
  }

  regra() {
    const regra = this.ruleCreateFormat;
    const observable = this._ruleService.createRule(regra);
    const verifications = [(this.account && this.account.length > 0), this.conditions.verify()];
    const errors = [
      'Para salvar uma regra você deve informar uma conta contábil.',
      'Para salvar uma regra você deve informar as condições da regra.'
    ];
    this._savePattern(observable, verifications, errors, true);
  }

  ignorar() {
    const regra = this.ruleCreateFormat;
    regra.contaMovimento = 'IGNORAR';
    const observable = this._ruleService.createRule(regra);
    const verification = this.conditions.verify();
    const error = ['Para salvar uma regra de ignorar, você deve informar as condições da regra.'];
    this._savePattern(observable, [verification], error);
  }

  fornecedor() {
    const observable = this._lancamentoService.saveAsDePara(this.records[0], this.account);
    const verification = this.account && this.account.length > 0;
    const error = ['Para atrelar o lançamento à uma conta de fornecedor, você deve informar a conta.'];
    this._savePattern(observable, [verification], error);
  }

  skip() {
    const observable = this._lancamentoService.skip(this.records[0].id);
    const error = '';
    this._savePattern(observable, [true], [error]);
  }

  private _savePattern(obs: Observable<Lancamento>, verifications: boolean[], errors: string[], rule?: boolean) {

    const verify = ArrayUtils.verify(verifications);

    if (verify) {
      if (rule) {
        this._historicService
          .getHistoric(this.business, this.account, this.records[0].tipoLancamento)
          .subscribe(data => {
            if (!data.records.length) {
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
      this.disable();
    });
  }

  onDevolve(events: { title: string, selecteds: string[] }[]) {

    this.conditions.tipoPlanilha = [this.records[0].tipoPlanilha];
    this.conditions.tipoMovimento = [this.records[0].tipoMovimento];

    events.forEach(event => {
      this.conditions[event.title] = event.selecteds.length ? event.selecteds : undefined;
    });

    if (this.conditions.rules.length === 2 && this.conditions.tipoPlanilha.length && this.conditions.tipoMovimento.length) {
      this.conditions.tipoPlanilha = [];
      this.conditions.tipoMovimento = [];
    }

    this.getByRule();
  }

  getByRule() {
    const rules = this.conditions.rules;
    if (rules.length > 0) {
      const subs = this._lancamentoService
        .getByRule(rules, this.business)
        .subscribe(data => {
          this.impact = data.pageInfo.totalElements;
          subs.unsubscribe();
        });
    } else {
      this.impact = 0;
    }
  }

  openGrid(): void {
    const dialogRef = this.dialog.open(RuleGridComponent, {
      maxWidth: '1400px',
      width: '95vw',
      data: {
        rules: this.conditions.rules,
        business: this.business
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  openHistoric(obs: Observable<Lancamento>): void {
    this.records[0].contaMovimento = this.account;
    const dialogRef = this.dialog.open(HistoricComponent, {
      maxWidth: '900px',
      width: '90vw',
      maxHeight: '90vh',
      data: {
        lancamento: this.records[0]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this._subsAndDisable(obs);
      if (result) {
        this.disable();
      }
      // if (result) {
      //   this._historicService
      //     .createHistoric(result)
      //     .subscribe((historic: any) => {
      //       this.disable();
      //       this._historicService.export(historic.record.id, historic.record).subscribe()
      //     });
      // }
    });
  }

  onTab(event: MatTabChangeEvent, isFirst: boolean) {
    const id = event.index;
    if (id === 0) {
      this.tabsPattern('PAG', 'pagamentos', isFirst);
    } else if (id === 1) {
      this.tabsPattern('EXDEB', 'extratos de débitos', isFirst);
    } else if (id === 2) {
      this.tabsPattern('REC', 'recebimentos', isFirst);
    } else if (id === 3) {
      this.tabsPattern('EXCRE', 'extratos de créditos', isFirst);
    }
  }

  async tabsPattern(tipoMovimento: string, tipoLancamentoName: string, isFirst: boolean) {
    this.destroy = true;
    if (!isFirst) {
      this.tabIsClicked = true;
      this.tabSelect.emit('true');
    }

    this.tipoMovimento = tipoMovimento;
    this.tipoLancamentoName = tipoLancamentoName;
    this.resetErrors();
    this.tipoConta = 0;
    this._partialDisable();
    this.nextPage();
    this.getByRule();
    await this._delay(300);
    this.destroy = false;
  }

  async disable() {
    // Reseta todas as variáveis locais após executar uma ação para permitir
    // que a próxima ação esteja pronta para ser executada.
    this.destroy = true;
    this._partialDisable();
    this._next();
    await this._delay(320);
    this.destroy = false;
  }

  private _partialDisable() {
    this.conditions = new Rule();
    this.getByRule();
    this.account = null;
  }


  private _delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private _next() {
    this.records.splice(0, 1);
    this.resetErrors();

    if (this.records.length === 0 && (!this.pageInfo || this.pageInfo.hasNext)) {
      this.tipoConta = 0
      this.nextPage();
    } else {
      this.resetErrors([`Você concluiu todos os ${this.tipoLancamentoName} desta empresa.`]);
      this.percentage = 100;
    }
  }

  nextPage() {
    let tipoLancamento: number;
    if (this.tipoMovimento === 'PAG' || this.tipoMovimento === 'EXDEB') {
      tipoLancamento = 1;
    } else if (this.tipoMovimento === 'REC' || this.tipoMovimento === 'EXCRE') {
      tipoLancamento = 2;
    }
    const pageCriteria = { pageIndex: this.pageInfo.pageIndex, pageSize: this.pageInfo.pageSize };
    const filter = { cnpjEmpresa: this.business.cnpj, tipoLancamento, tipoMovimento: this.tipoMovimento, tipoConta: this.tipoConta, ativo: true };
    Object.assign(filter, pageCriteria);
    this._toast.showSnack('Aguardando resposta');

    this._lancamentoService.getLancamentos(filter).subscribe(imports => {

      this.records = imports.records;
      this.pageInfo = imports.pageInfo;
      this.resetErrors();
      this._toast.hideSnack();

      if (imports.pageInfo.totalElements === 0 && this.tipoConta === 0 && filter.tipoMovimento === this.tipoMovimento) {
        this.tipoConta = 4;
        this.nextPage();
      }

      if (this.tipoConta === 4 && this.pageInfo.totalElements === 0) {
        this.resetErrors([`Você concluiu todos os ${this.tipoLancamentoName} desta empresa!`]);
      }

    });

    this._lancamentoService.getPercentage(this.business.cnpj, this.tipoMovimento).subscribe((percentage: any) => {
      if (percentage.totalLancamentos) {
        this.percentage = +(100 - (percentage.numeroLancamentosRestantes / percentage.totalLancamentos) * 100).toFixed(0);
      } else {
        this.percentage = 100;
      }
      this.total = percentage.totalLancamentos;
    })
  }

  get descricao(): RuleConfig {
    return {
      selectable: true,
      title: this.buttonLabel,
      values: [
        {
          key: 'descricao',
          label: this.buttonLabel,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.records[0].descricao
        }
      ]
    };
  }

  get portador(): RuleConfig {
    return {
      selectable: true,
      title: 'Banco',
      values: [
        {
          key: 'portador',
          label: 'Banco',
          pattern: BANK_CHIP_PATTERN,
          value: this.records[0].portador
        }
      ]
    };
  }

  get dataMovimento(): RuleConfig {
    return {
      selectable: false,
      title: 'Data',
      values: [
        {
          key: 'dataMovimento',
          label: 'Data',
          pattern: DATE_CHIP_PATTERN,
          value: this.records[0].dataMovimento
        }
      ]
    };
  }

  get valorOriginal(): RuleConfig {
    return {
      selectable: false,
      title: 'Valor',
      values: [
        {
          key: 'valorOriginal',
          label: 'Valor',
          pattern: VALUE_CHIP_PATTERN,
          value: `${this.records[0].valorOriginal}`
        }
      ]
    };
  }

  get documento(): RuleConfig {
    return {
      selectable: true,
      title: 'Documento',
      values: [
        {
          key: 'documento',
          label: 'Documento',
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.records[0].documento
        }
      ]
    };
  }

  get complementos(): RuleConfig {
    return {
      selectable: true,
      title: 'Complementos',
      values: [
        {
          key: 'complemento01',
          label: this.records[0].arquivo.labelComplemento01,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.records[0].complemento01
        },
        {
          key: 'complemento02',
          label: this.records[0].arquivo.labelComplemento02,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.records[0].complemento02
        },
        {
          key: 'complemento03',
          label: this.records[0].arquivo.labelComplemento03,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.records[0].complemento03
        },
        {
          key: 'complemento04',
          label: this.records[0].arquivo.labelComplemento04,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.records[0].complemento04
        },
        {
          key: 'complemento05',
          label: this.records[0].arquivo.labelComplemento05,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.records[0].complemento05
        }
      ]
    };
  }

  get complemento02(): RuleConfig {
    return {
      selectable: true,
      title: this.records[0].arquivo.labelComplemento02,
      values: [
        {
          key: 'complemento02',
          label: this.records[0].arquivo.labelComplemento02,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.records[0].complemento02
        }
      ]
    };
  }

}
