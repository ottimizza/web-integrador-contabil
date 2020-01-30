import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lancamento } from '@shared/models/Lancamento';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { LancamentoService } from '@shared/services/lancamento.service';
import { PostFormatRule } from '@shared/models/Rule';
import { Empresa } from '@shared/models/Empresa';

@Component({
  templateUrl: './rule-grid.component.html'
})
export class RuleGridComponent implements OnInit, GenericPagination {

  info: Lancamento[];
  pageInfo: PageInfo;
  page = 0;
  rules: PostFormatRule[];
  business: Empresa;


  constructor(
    public dialogRef: MatDialogRef<RuleGridComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: LancamentoService
  ) { }

  ngOnInit(): void {
    // Saída temporária
    this.info = this.data.table;

    this.rules = this.data.rules;
    this.business = this.data.business;
    this.info = [];

    this.nextPage();
  }


  nextPage(): void {
    if (this.hasNext()) {
      this._service
        .getByRulePaginated(this.rules, this.business, this.page)
        .subscribe(imports => {
          imports.records.forEach(lanc => this.info.push(lanc));
          this.pageInfo = imports.pageInfo;
          this.page++;
        });
    }
  }

  hasNext() {
    return !this.pageInfo || this.pageInfo.hasNext;
  }

  dateFormat(date: string) {
    const dates = date.split('-');
    return `${dates[2]}/${dates[1]}/${dates[0]}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get hasFonecedor(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.descricao);
    });
    return this._verifyPattern(props);
  }

  get hasBanco(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.portador);
    });
    return this._verifyPattern(props);
  }

  get hasData(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.dataMovimento);
    });
    return this._verifyPattern(props);
  }

  get hasValor(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.valorOriginal);
    });
    return this._verifyPattern(props);
  }

  get hasDocumento(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.documento);
    });
    return this._verifyPattern(props);
  }

  get hasNomeArquivo(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.nomeArquivo);
    });
    return this._verifyPattern(props);
  }

  get hasTipoPlanilha(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.tipoPlanilha);
    });
    return this._verifyPattern(props);
  }

  get hasComplemento1(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.complemento01);
    });
    return this._verifyPattern(props);
  }

  get hasComplemento2(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.complemento02);
    });
    return this._verifyPattern(props);
  }

  get hasComplemento3(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.complemento03);
    });
    return this._verifyPattern(props);
  }

  get hasComplemento4(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.complemento04);
    });
    return this._verifyPattern(props);
  }

  get hasComplemento5(): boolean {
    const props = [];
    this.info.forEach(lanc => {
      props.push(lanc.complemento05);
    });
    return this._verifyPattern(props);
  }

  private _verifyPattern(property: any[]) {
    const verify = a => {
      if (a) {
        return true;
      }
      return false;
    };

    const array = property.filter(prop => {
      return verify(prop);
    });

    return array.length > 0;
  }

}
