import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { ArrayUtils } from '@shared/utils/array.utils';
import { Empresa } from '@shared/models/Empresa';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { HistoricComponent } from './historic/historic.component';
import { HistoricService } from '@shared/services/historic.service';
import { Lancamento } from '@shared/models/Lancamento';
import { LancamentoService } from '@shared/services/lancamento.service';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { Rule, RuleCreateFormat } from '@shared/models/Rule';
import { RuleGridComponent } from './rule-creator/rule-grid.component';
import { RuleService } from '@shared/services/rule.service';

@Component({
  selector: 'app-tdetail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit, GenericPagination {

  @Input() business: Empresa;
  @Output() tabSelect = new EventEmitter();
  conditions = new Rule();
  pageInfo: PageInfo;
  records: Lancamento[] = [];
  tabsButtonClass: string[];
  account: string;
  errorText: string;
  errorText2: string;
  tipoLancamentoName: string;
  tipoLancamento = 1;
  destroy: boolean;
  tabIsClicked = false;
  tipoMovimento = 'PAG';
  remaining = 0;
  page = 0;
  impact = 0;
  impactCounter = 0;
  counter = 0;
  // ! Cuidado ao alterar o counter, fazer isto apenas através do tabsPattern() e do _remaining()

  constructor(
    // tslint:disable: variable-name
    private _lancamentoService: LancamentoService,
    private _ruleService: RuleService,
    private _historicService: HistoricService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._resetButtons();
  }

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
      rule: 'A conta informada deve ser aplicada em todas as ocorrências das palavras selecionada.',
      ignore: 'Todos os lançamentos com as palavras selecionada serão ignorados.',
      skip: 'Deixar este lançamento para depois.',
      ok: 'Salvar a regra selecionada para uma conta contábil ou ignorar todos os lançamentos que se encaixem nesta regra.',
      affecteds: 'Clique para visualizar os lançamentos afetados.',
      provider: 'A conta informada será aplicada para todas as ocorrências deste fornecedor e qualquer outro campo marcado será ignorado.',
      info: `Agora clique nas palavras que justificam o lançamento ser aplicado a determinada conta ou ignorado.
      Se necessário, informe a conta.`
    };
  }

  getComplementos() {
    /*
     * Transforma todos os complementos (5 strings) em um objeto legível para os componentes filhos
     * (para o componente dos chips especificamente)
     */

    const lancamento = this.records[0];
    const arquivo = lancamento.arquivo;
    const ok = !!((lancamento.complemento01 && arquivo.labelComplemento01) ||
                  (lancamento.complemento02 && arquivo.labelComplemento02) ||
                  (lancamento.complemento03 && arquivo.labelComplemento03) ||
                  (lancamento.complemento04 && arquivo.labelComplemento04) ||
                  (lancamento.complemento05 && arquivo.labelComplemento05));
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

  regra() {
    // const regra = new RuleCreateFormat(this.conditions.rules, this.business.cnpj, this.account);
    const regra = new RuleCreateFormat(this.conditions.rules, this.business.cnpj, this.records[0].cnpjContabilidade, this.account);
    const observable = this._ruleService.createRule(regra);
    const verifications = [(this.account && this.account.length > 0), this.conditions.verify()];
    const errors = [
      'Para salvar uma regra você deve informar uma conta contábil.',
      'Para salvar uma regra você deve informar as condições da regra.'
    ];
    this._savePattern(observable, verifications, errors, true);
  }

  ignorar() {
    const observable = this._lancamentoService.ignoreLancamento(this.records[0]);
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
          .getHistoric(this.business, this.account)
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

  onDevolve(event: any) {
    const s = event.selecteds;

    switch (event.title) {
      case 'Fornecedor':
        this.conditions.descricao = s;
        break;
      case 'Documento':
        this.conditions.documento = s;
        break;
      case 'Banco':
        this.conditions.portador = s;
        break;
      case 'Complemento 1':
        this.conditions.complemento01 = s;
        break;
      case 'Complemento 2':
        this.conditions.complemento02 = s;
        break;
      case 'Complemento 3':
        this.conditions.complemento03 = s;
        break;
      case 'Complemento 4':
        this.conditions.complemento04 = s;
        break;
      case 'Complemento 5':
        this.conditions.complemento05 = s;
        break;
      case 'Tipo da Planilha':
        this.conditions.tipoPlanilha = s;
        break;
      case 'Nome do Arquivo':
        this.conditions.nomeArquivo = s;
        break;
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
    const dialogRef = this.dialog.open(HistoricComponent, {
      maxWidth: '900px',
      width: '90vw',
      data: {
        lancamento: this.records[0]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this._subsAndDisable(obs);
      if (result) {
        this._historicService
          .createHistoric(result)
          .subscribe();
      }
    });
  }

  pag() {
    this.tabsPattern(0, 1, 'PAG', 'pagamentos');
  }

  expag() {
    this.tabsPattern(1, 1, 'EXPAG', 'extratos de débitos');
  }

  rec() {
    this.tabsPattern(2, 1, 'REC', 'recebimentos');
  }

  exrec() {
    this.tabsPattern(3, 1, 'EXREC', 'extratos de recebimentos');
  }

  async tabsPattern(position: number, tipoLancamento: number, tipoMovimento: string, tipoLancamentoName: string) {
    this.destroy = true;
    this._resetButtons();
    this.tabsButtonClass[position] = 'btn btn-info col';
    this.tabIsClicked = true;
    this.tabSelect.emit('true');

    this.tipoLancamento = tipoLancamento;
    this.tipoMovimento = tipoMovimento;
    this.tipoLancamentoName = tipoLancamentoName;
    this.counter = 0;
    this.page = 0;
    this._partialDisable();
    this.nextPage();
    this.getByRule();
    await this._delay(300);
    this.destroy = false;
  }

  async disable() {
    // Reseta todas as variáveis locais após executar uma ação para permitir
    // que a próxima ação esteja pronta para ser executada.

    // O impactCounter recebe o impact menos 1 pois este "1" é o lançamento atual que já é contado através do counter
    this.impactCounter += this.impact - 1;

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

  private _resetButtons() {
    this.tabsButtonClass = [
      'btn btn-outline-link col',
      'btn btn-outline-link col',
      'btn btn-outline-link col',
      'btn btn-outline-link col'
    ];
  }

  private _remaining(autoIncrement?: boolean) {
    if (this.pageInfo) {
      this.remaining = this.pageInfo.totalElements - (this.counter + this.impactCounter);
    }
    if (autoIncrement === true) {
      this.counter++;
    }
  }

  private _delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private _next() {
    this.records.splice(0, 1);
    this.resetErrors();

    if (this.records.length === 0 && (!this.pageInfo || this.pageInfo.hasNext)) {
      this.nextPage();
      this._remaining(true);
    } else if (this.records.length !== 0) {
      this._remaining(true);
    } else {
      this._remaining();
      this.resetErrors([`Você conclui todos os ${this.tipoLancamentoName} desta empresa.`]);
    }
  }

  nextPage() {
    this._lancamentoService.getLancamentos(this.page, this.business, this.tipoLancamento, this.tipoMovimento).subscribe(imports => {
      this.records = imports.records;
      this.pageInfo = imports.pageInfo;
      this.impactCounter = 0;
      this._remaining(this.counter === 0);
      // if (this.counter === 0) {
      //   this._remaining(true);
      // }
      this.page++;
      this.resetErrors();
    });
  }

}
