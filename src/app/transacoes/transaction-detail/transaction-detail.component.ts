import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RecordService } from '@app/services/record.service';
import { Lancamento } from '@shared/models/Record';
import { PageInfo } from '@shared/models/ImportacaoLancamentosRequest';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-tdetail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  record: Lancamento;
  records: Lancamento[] = [];
  id = 0;
  account: string;
  conditions: any;
  suggestions: string[];
  ruleSelected = false;
  pageInfo: PageInfo;
  elementsQuant = 0;

  constructor(
    // tslint:disable: variable-name
    private _service: RecordService,
    private _route: ActivatedRoute,
    private _router: Router,
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
      general: 'Nesta tela, você deve clicar nos campos para selecioná-los. Você pode pular este lançamento ou criar uma regra para os campos selecionados.',
      progressBar: `${this.percentage}% de ${this.elements}`,
      account: 'Insira neste campo, a conta relativa a este lançamento ou selecione uma das sugeridas.',
      rule: 'A conta informada deve ser aplicada em todas as ocorrências da regra selecionada.',
      ignore: 'Todos os lançamentos com a regra seleciona serão ignorados.',
      skip: 'Selecione esta opção caso você não consiga preencher sózinho ou não tenha os dados necessários no momento.',
      ok: 'Salvar a regra selecionada para uma conta contábil ou ignorar todos os lançamentos que se encaixem nesta regra.',
      cancel: 'Voltar à barra de opções anterior.',
      affecteds: 'Clique aqui para visualizar os lançamentos afetados.'
    };
  }

  get percentage() {
    return ((this.elementsQuant / this.elements) * 100).toFixed(2);
  }

  regra() {
    if (this.account && this.verifyConditions()) {
      this._service
        .saveAsDePara(this.records[0], this.account)
        .subscribe(data => {
          this._disable();
        });
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
    if (this.verifyConditions()) {
      this._service
        .ignoreRecord(this.records[0])
        .subscribe(data => {
          this._disable();
        });
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

  private get elements() {
    let totalElements = 0;
    if (this.pageInfo) {
      totalElements = this.pageInfo.totalElements;
    }
    return totalElements;
  }

  private _disable() {
    this.resetConditions();
    this.ruleSelected = false;
    this.account = null;
    this._next();
  }

  private _next() {

   if (this.id === 0) {
    this._nextPage();
   } else {
     this.records.splice(0, 1);
   }

   this.id++;
   if (this.id + 1 === this.pageInfo.pageSize) { this.id = 0; }


  }

  private _nextPage() {
    this._service
      .getRecords()
      .subscribe(imports => {
        this.records = imports.records;
        this.pageInfo = imports.pageInfo;
      });
  }

  private verifyConditions() {
    return this.conditions.dataMovimento ||
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
    this.conditions.nomeArquivo;
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
