import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';

import { MatTabChangeEvent } from '@angular/material/tabs';

import { HistoricEditDialogComponent } from '@modules/historic/dialogs/historic-edit-dialog/historic-edit-dialog.component';
import { ConfirmDeleteDialogComponent } from '../dialogs/confirm-delete/confirm-delete-dialog.component';
import { BeforeComponentDestroyed } from '@shared/operators/before-component-destroyed.operator';
import { DEFAULT_CHIP_PATTERN } from './rule-creator/chips-group/patterns/DEFAULT_CHIP_PATTERN';
import { VALUE_CHIP_PATTERN } from './rule-creator/chips-group/patterns/VALUE_CHIP_PATTERN';
import { DATE_CHIP_PATTERN } from './rule-creator/chips-group/patterns/DATE_CHIP_PATTERN';
import { FAKE_ENTRY } from '../transaction-list/tutorial/transaction-list.tutorial';
import { RuleConfig } from './rule-creator/chips-group/chips-group.component';
import { DialogService, DialogWidth } from '@app/services/dialog.service';
import { LancamentoService } from '@shared/services/lancamento.service';
import { Lancamento, TipoLancamento } from '@shared/models/Lancamento';
import { RuleGridComponent } from './rule-creator/rule-grid.component';
import { HistoricService } from '@shared/services/historic.service';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { TutorialService } from '@app/services/tutorial.service';
import { SnapshotService } from '@app/services/snapshot.service';
import { ToastService } from '@shared/services/toast.service';
import { Rule, RuleCreateFormat } from '@shared/models/Rule';
import { FormattedHistoric } from '@shared/models/Historic';
import { RuleService } from '@shared/services/rule.service';
import { ArrayUtils } from '@shared/utils/array.utils';
import { TimeUtils } from '@shared/utils/time.utils';
import { DateUtils } from '@shared/utils/date-utils';
import { Empresa } from '@shared/models/Empresa';
import { User } from '@shared/models/User';

@Component({
  selector: 'app-tdetail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent extends BeforeComponentDestroyed implements OnInit {

  @Output() tabSelect = new EventEmitter();
  @Input() business: Empresa;

  pageInfo = PageInfo.defaultPageInfo();
  entry: Lancamento;

  conditions = new Rule();
  account = new FormControl();

  tipoMovimento = 'PAG';
  tipoLancamentoName: string;

  errorText2: string;
  errorText: string;

  tabIsClicked = false;

  impact = 0;
  percentage = 0;

  isFetching = false;
  rebuild = 0;

  total = 'Calculando...';

  currentUser: User;

  public showProposedRules = true;
  public legacyShowProposedRules = true;
  public useAccountingIntelligenceInProposedRules = false;
  public proposedRuleId: number;

  public recoverState: Subject<any>;

  constructor(
    // tslint:disable
    private _lancamentoService: LancamentoService,
    private _historicService: HistoricService,
    private _ruleService: RuleService,
    private _toast: ToastService,
    private _tutorialService: TutorialService,
    private _snapshotService: SnapshotService,
    public dialog: DialogService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
    this.onTab({ tab: null, index: 0 }, true);
    this.setTutorials();
  }

  setTutorials() {
    this._tutorialService.afterTutorialStarted
    .pipe(this.takeUntil)
    .subscribe(() => {
      this.recoverState = this._snapshotService.recycle(this, ['entry', 'errorText', 'errorText2', 'total', 'conditions'])
      this.errorText = null;
      this.errorText2 = null;
      this.total = '1';
      this.entry = FAKE_ENTRY;
      Object.assign(this.conditions, { verify: () => true });
    });
    this._tutorialService.afterTutorialClosed
    .pipe(this.takeUntil).subscribe(() => {
      this.recoverState.next();
    });
  }

  public getLabelContaMovimento(lancamento: Lancamento = this.entry): string {
    return lancamento.tipoLancamento === TipoLancamento.PAGAMENTOS ? 'Conta Débito' : 'Conta Crédito';
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

  get accountLabel() {
    if (this.tipoMovimento === 'PAG' || this.tipoMovimento === 'EXDEB') {
      return 'Conta Débito';
    } else {
      return 'Conta Crédito';
    }
  }

  get info() {
    return {
      provider: 'A conta informada será aplicada para todas as ocorrências deste fornecedor e qualquer outro campo marcado será ignorado.',
      ok: 'Salvar a regra selecionada para uma conta contábil ou ignorar todos os lançamentos que se encaixem nesta regra.',
      info: 'Selecione os termos que justificam o lançamento ser vinculado a determinada conta ou ser ignorado.',
      account: 'Insira neste campo, a conta relativa a este lançamento.',
      rule: 'A conta informada deve ser aplicada em todas as ocorrências das palavras selecionada.',
      ignore: 'Todos os lançamentos com as palavras selecionada serão ignorados.',
      affectedsOrientation: 'Lançamentos já parametrizados podem ser afetados',
      affecteds: 'Clique para visualizar os lançamentos afetados.',
    };
  }

  get hasComplements() {
    const l: any = this.entry || {};
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
      this.entry.cnpjContabilidade,
      this.entry.tipoLancamento,
      this.entry.idRoteiro,
      this.account.value
    );
  }

  get ruleAddiotionalInformation() {
    let sugerir: 0 | 1 | 2 = 2;
    if (this.legacyShowProposedRules) {
      sugerir = this.useAccountingIntelligenceInProposedRules ? 0 : 1;
    }
    return {
      sugerir,
      regraSugerida: this.proposedRuleId
    }
  }

  regra() {
    if (this.ruleCreateFormat.regras.length > 6) {
      this.errorText = 'Você não pode salvar uma regra com mais de 4 cláusulas!';
      return;
    }
    const regra = this.ruleCreateFormat;
    const observable = this._ruleService.createRule(regra, this.ruleAddiotionalInformation)
    .pipe(
      switchMap(() => this._historicService.getHistoric(this.business, this.account.value, this.entry.tipoLancamento)),
      map(result => !!result.records.length),
      switchMap(hasHistoric => hasHistoric ? of(null) : this.openHistoric())
    );
    const verifications = [!!this.account?.value?.length, this.conditions.verify()];
    const errors = [
      'Para salvar uma regra você deve informar uma conta contábil.',
      'Para salvar uma regra você deve informar as condições da regra.'
    ];
    this._savePattern(observable, verifications, errors);
  }

  ignorar() {
    if (this.ruleCreateFormat.regras.length > 6) {
      this.errorText = 'Você não pode salvar uma regra com mais de 5 cláusulas!';
      return;
    }
    const regra = this.ruleCreateFormat;
    regra.contaMovimento = 'IGNORAR';
    const observable = this._ruleService.createRule(regra, this.ruleAddiotionalInformation);
    const verification = this.conditions.verify();
    const error = ['Para salvar uma regra de ignorar, você deve informar as condições da regra.'];
    this._savePattern(observable, [verification], error);
  }

  fornecedor() {
    const observable = this._lancamentoService.saveAsDePara(this.entry, this.account.value);
    const verification = this.account && this.account.value.length > 0;
    const error = ['Para atrelar o lançamento à uma conta de fornecedor, você deve informar a conta.'];
    this._savePattern(observable, [verification], error);
  }

  private _savePattern(obs: Observable<Lancamento>, verifications: boolean[], errors: string[]) {

    const verify = ArrayUtils.verify(verifications);

    if (verify) {
      this._subsAndDisable(obs);
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
    this.conditions.tipoPlanilha = [this.entry.tipoPlanilha];
    this.conditions.tipoMovimento = [this.entry.tipoMovimento];

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

  openHistoric(): Observable<any> {
    let tipoLancamento = 1;
    if (this.tipoMovimento === 'REC' || this.tipoMovimento === 'EXCRE') {
      tipoLancamento = 2;
    }

    const entry: any = this.entry;
    entry.competencia = DateUtils.ymdToCompetence(entry.dataMovimento);
    entry.competenciaAnterior = DateUtils.lastCompetence(entry.competencia);

    const reference = new FormattedHistoric('', this.account.value, tipoLancamento, entry.idRoteiro, entry.cnpjEmpresa, entry.cnpjContabilidade);
    return this.dialog.openComplexDialog(HistoricEditDialogComponent, DialogWidth.LARGE, {
      type: 'post',
      reference,
      entry
    })
  }

  onTab(event: MatTabChangeEvent, isFirst: boolean) {
    const id = event.index;
    if (id === 0) {
      this.tabsPattern('PAG', 'Pagamentos', isFirst);
    } else if (id === 1) {
      this.tabsPattern('EXDEB', 'Extratos de Débitos', isFirst);
    } else if (id === 2) {
      this.tabsPattern('REC', 'Recebimentos', isFirst);
    } else if (id === 3) {
      this.tabsPattern('EXCRE', 'Extratos de Créditos', isFirst);
    }
  }

  tabsPattern(tipoMovimento: 'PAG' | 'EXDEB' | 'REC' | 'EXCRE', tipoLancamentoName: string, isFirst: boolean) {
    if (!isFirst) {
      this.tabIsClicked = true;
    }
    this.tabSelect.emit(tipoLancamentoName);

    this.total = 'Calculando...'

    this.pageInfo = PageInfo.defaultPageInfo();
    this.tipoMovimento = tipoMovimento;
    this.tipoLancamentoName = tipoLancamentoName.toLowerCase();
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
    this.account.setValue('');
  }

  public async proposeRules() {
    this._toast.showSimpleSnackBar('Obtendo regra sugerida...');
    const data = await this._ruleService.proposeRules(this.entry.id, this.useAccountingIntelligenceInProposedRules);
    this.account.setValue(data.account);
    this.proposedRuleId = data.id;
    this._toast.hideSnack();
  }

  public async requestEntry() {
    this.resetErrors();

    const rs = await this.fetch();
    this.entry = rs.records[0];
    this.pageInfo = rs.pageInfo;
    this.legacyShowProposedRules = this.showProposedRules;
    if (this.entry && this.showProposedRules) {
      await this.proposeRules();
    } else {
      this._ruleService.lastProposedRule = null;
    }

    this.reConstruct();

    this.calcPercentage();

    if (!this.entry) {
      if (!this.pageInfo.hasPrevious) {
        this.resetErrors([`Você concluiu todos os ${this.tipoLancamentoName} desta empresa.`]);
        this.percentage = 100;
      } else {
        this.pageInfo.pageIndex--;
        await this.requestEntry();
      }
    }
  }

  public async reConstruct() {
    for (let i = 1; i < 8; i++) {
      this.rebuild = i;
      await TimeUtils.sleep(1);
      this._ruleService.onReconstructionCompleted();
    }
    this.onReconstructionCompleted()
  }

  public onReconstructionCompleted() {
    this.rebuild = 0;
    if (this.showProposedRules) {
      this._ruleService.onReconstructionEnded();
    }
  }

  public async proceed() {
    this.isFetching = true;
    await this.requestEntry();
    this.isFetching = false;
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
    this.dialog.open(ConfirmDeleteDialogComponent, this.entry.arquivo).subscribe(e => {
      if (e === 'deleted') {
        this.proceed();
      }
    });
  }

  async fetch() {
    let tipoLancamento = 1;
    if (this.tipoMovimento === 'REC' || this.tipoMovimento === 'EXCRE') {
      tipoLancamento = 2;
    }

    const filter = {
      cnpjEmpresa: this.business.cnpj,
      tipoLancamento,
      tipoMovimento: this.tipoMovimento,
      tipoConta: 0,
      ativo: true,
      cnpjContabilidade: this.currentUser.organization.cnpj
    };
    const pageCriteria = { pageIndex: this.pageInfo.pageIndex, pageSize: 1 };
    Object.assign(filter, pageCriteria);

    this._toast.showSnack('Aguardando lançamento...');
    return this._lancamentoService.getLancamentos(filter)
      .pipe(finalize(() => {
        this.conditions = new Rule();
        this._toast.hideSnack();
        this.conditions = new Rule();
      }))
      .toPromise();
  }

  public ruleLabel() {
    return this.tipoMovimento === 'REC' || this.tipoMovimento === 'EXCRE' ?
    'Não é cliente' :
    'Não é fornecedor'
  }

  public calcPercentage() {
    const filter = { cnpjEmpresa: this.business.cnpj, tipoMovimento: this.tipoMovimento };
    this._lancamentoService.calcPercentage(filter).subscribe((result: any) => {
      if (result.totalLancamentos) {
        this.percentage = Math.floor(100 - (result.numeroLancamentosRestantes / result.totalLancamentos) * 100);
      } else {
        this.percentage = 100;
      }
      this.total = `${result.totalLancamentos || 0}`;
    });
  }

  /**
   * @description Obtém o label do botão de regras
   * @returns o label
   */
  public getRuleButtonDescription() {
    switch (this.entry.tipoLancamento) {
      case TipoLancamento.PAGAMENTOS:   return 'Não é fornecedor'
      case TipoLancamento.RECEBIMENTOS: return 'Não é cliente'
      default:                          return 'Regra'
    }
  }

  public clean() {
    this._ruleService.clean();
  }

  descricao(): RuleConfig {
    return {
      selectable: true,
      title: 'Descrição',
      values: [
        {
          key: 'descricao',
          label: 'Descrição',
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.entry.descricao
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
          value: this.entry.portador
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
          value: this.entry.dataMovimento
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
          value: `${this.entry.valorOriginal}`
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
          value: this.entry.documento
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
          label: this.entry.arquivo.labelComplemento01,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.entry.complemento01
        },
        {
          key: 'complemento02',
          label: this.entry.arquivo.labelComplemento02,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.entry.complemento02
        },
        {
          key: 'complemento03',
          label: this.entry.arquivo.labelComplemento03,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.entry.complemento03
        },
        {
          key: 'complemento04',
          label: this.entry.arquivo.labelComplemento04,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.entry.complemento04
        },
        {
          key: 'complemento05',
          label: this.entry.arquivo.labelComplemento05,
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.entry.complemento05
        }
      ]
    };
  }

  complemento02(): RuleConfig {
    return {
      selectable: true,
      title: 'Complemento',
      values: [
        {
          key: 'complemento02',
          label: 'Complemento',
          pattern: DEFAULT_CHIP_PATTERN,
          value: this.entry.complemento02
        }
      ]
    };
  }

}
