import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, fromEvent, interval, of, from } from 'rxjs';

import { MatTabChangeEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

import { DEFAULT_CHIP_PATTERN } from './rule-creator/chips-group/patterns/DEFAULT_CHIP_PATTERN';
import { VALUE_CHIP_PATTERN } from './rule-creator/chips-group/patterns/VALUE_CHIP_PATTERN';
import { DATE_CHIP_PATTERN } from './rule-creator/chips-group/patterns/DATE_CHIP_PATTERN';
import { RuleConfig } from './rule-creator/chips-group/chips-group.component';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { LancamentoService } from '@shared/services/lancamento.service';
import { RuleGridComponent } from './rule-creator/rule-grid.component';
import { HistoricService } from '@shared/services/historic.service';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { ToastService } from '@shared/services/toast.service';
import { Rule, RuleCreateFormat } from '@shared/models/Rule';
import { RuleService } from '@shared/services/rule.service';
import { ArrayUtils } from '@shared/utils/array.utils';
import { Lancamento } from '@shared/models/Lancamento';
import { Empresa } from '@shared/models/Empresa';
import { finalize, catchError, switchMap, map } from 'rxjs/operators';
import { User } from '@shared/models/User';
import { ConfirmDeleteDialogComponent } from '../dialogs/confirm-delete/confirm-delete-dialog.component';
import { DialogService, DialogWidth } from '@app/services/dialog.service';
import { HistoricEditDialogComponent } from '@modules/historic/dialogs/historic-edit-dialog/historic-edit-dialog.component';
import { FormattedHistoric } from '@shared/models/Historic';
import { DateUtils } from '@shared/utils/date-utils';

@Component({
  selector: 'app-tdetail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  @Output() tabSelect = new EventEmitter();
  @Input() business: Empresa;

  pageInfo = PageInfo.defaultPageInfo();
  records: Lancamento[] = [];

  conditions = new Rule();
  account: string;

  tipoMovimento = 'PAG';
  tipoLancamentoName: string;

  errorText2: string;
  errorText: string;

  destroy: boolean;
  tabIsClicked = false;

  impact = 0;
  percentage = 0;

  isFetching = false;

  total = 'Calculando...';

  currentUser: User;

  constructor(
    // tslint:disable
    private _lancamentoService: LancamentoService,
    private _historicService: HistoricService,
    private _ruleService: RuleService,
    private _toast: ToastService,
    public dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
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
    };
  }

  get hasComplements() {
    const l: any = this.records[0] || {};
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
    const verifications = [!!this.account?.length, this.conditions.verify()];
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
    this.dialog.openComplexDialog(RuleGridComponent, DialogWidth.EXTRA_LARGE, { rules: this.conditions.rules, company: this.business })
    .subscribe();
  }

  openHistoric(obs: Observable<Lancamento>): void {
    let tipoLancamento = 1;
    if (this.tipoMovimento === 'REC' || this.tipoMovimento === 'EXCRE') {
      tipoLancamento = 2;
    }

    const entry: any = this.records[0];
    Object.assign(entry, { competencia: DateUtils.ymdToCompetence(entry.dataMovimento) });
    Object.assign(entry, { competenciaAnterior: DateUtils.lastCompetence(entry.competencia) })

    const reference = new FormattedHistoric('', this.account, tipoLancamento, entry.idRoteiro, entry.cnpjEmpresa, entry.cnpjContabilidade);
    this.dialog.openComplexDialog(HistoricEditDialogComponent, DialogWidth.LARGE, {
      type: 'post',
      reference,
      entry
    })
      .subscribe(() => {
        this._subsAndDisable(obs);
        // if (result) {
        //   this.disable();
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

  tabsPattern(tipoMovimento: string, tipoLancamentoName: string, isFirst: boolean) {
    if (!isFirst) {
      this.tabIsClicked = true;
      this.tabSelect.emit('true');
    }

    this.total = 'Calculando...'

    this.pageInfo = PageInfo.defaultPageInfo();
    this.tipoMovimento = tipoMovimento;
    this.tipoLancamentoName = tipoLancamentoName;
    this.resetErrors();
    this._partialDisable();
    this.getByRule();

    this.proceed();
  }

  disable() {
    // Reseta todas as variáveis locais após executar uma ação para permitir
    // que a próxima ação esteja pronta para ser executada.
    this._partialDisable();
    this.proceed();
  }

  private _partialDisable() {
    this.conditions = new Rule();
    this.getByRule();
    this.account = null;
  }

  public async requestEntry() {
    this.records = null;
    this.resetErrors();

    const rs = await this.fetch();
    this.records = rs.records;
    this.pageInfo = rs.pageInfo;

    this.calcPercentage();

    if (!this.records.length) {
      this.resetErrors([`Você concluiu todos os ${this.tipoLancamentoName} desta empresa.`]);
      this.percentage = 100;
    }
  }

  public async proceed(animate = true) {
    if (animate) {
      this.destroy = true;
    }
    await this.requestEntry();
    this.destroy = false;
  }


  public navigate(direction: 'next' | 'previous') {
    if (direction === 'next' && this.pageInfo.hasNext) {
      this.pageInfo.pageIndex++;
      this.impact = 0;
      this.proceed();
    } else if (direction === 'previous' && this.pageInfo.hasPrevious) {
      this.pageInfo.pageIndex--;
      this.impact = 0;
      this.proceed();
    }
  }

  delete() {
    this.dialog.open(ConfirmDeleteDialogComponent, this.records[0].arquivo).subscribe(e => {
      if (e === 'deleted') {
        this.proceed(false);
      }
    });
  }

  fetch() {
    this.isFetching = true;

    let tipoLancamento = 1;
    if (this.tipoMovimento === 'REC' || this.tipoMovimento === 'EXCRE') {
      tipoLancamento = 2;
    }

    const filter = { cnpjEmpresa: this.business.cnpj, tipoLancamento, tipoMovimento: this.tipoMovimento, tipoConta: 0, ativo: true, cnpjContabilidade: this.currentUser.organization.cnpj };
    const pageCriteria = { pageIndex: this.pageInfo.pageIndex, pageSize: 1 };
    Object.assign(filter, pageCriteria);

    this._toast.showSnack('Aguardando lançamento...');
    return this._lancamentoService.getLancamentos(filter)
      .pipe(finalize(() => {
        this.isFetching = false;
        this._toast.hideSnack();
      }))
      .toPromise();
  }

  public calcPercentage() {
    const filter = { cnpjEmpresa: this.business.cnpj, tipoMovimento: this.tipoMovimento };
    this._lancamentoService.calcPercentage(filter).subscribe((result: any) => {
      if (result.totalLancamentos) {
        this.percentage = +(100 - (result.numeroLancamentosRestantes / result.totalLancamentos) * 100).toFixed(0);
      } else {
        this.percentage = 100;
      }
      this.total = `${result.totalLancamentos || 0}`;
    });
  }

  descricao(): RuleConfig {
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

  portador(): RuleConfig {
    return {
      selectable: true,
      title: 'Banco',
      values: [
        {
          key: 'portador',
          label: 'Banco',
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.records[0].portador
        }
      ]
    };
  }

  dataMovimento(): RuleConfig {
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

  valorOriginal(): RuleConfig {
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

  documento(): RuleConfig {
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

  complementos(): RuleConfig {
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

  complemento02(): RuleConfig {
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
