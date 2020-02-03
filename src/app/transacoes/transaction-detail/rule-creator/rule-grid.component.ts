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
    return this._hasPattern('fornecedor');
  }

  get hasBanco(): boolean {
    return this._hasPattern('banco');
  }

  get hasData(): boolean {
    return this._hasPattern('data');
  }

  get hasValor(): boolean {
    return this._hasPattern('valor');
  }

  get hasDocumento(): boolean {
    return this._hasPattern('documento');
  }

  get hasNomeArquivo(): boolean {
    return this._hasPattern('nome');
  }

  get hasTipoPlanilha(): boolean {
    return this._hasPattern('planilha');
  }

  get hasComplemento1(): boolean {
    return this._hasPattern('c1');
  }

  get hasComplemento2(): boolean {
    return this._hasPattern('c2');
  }

  get hasComplemento3(): boolean {
    return this._hasPattern('c3');
  }

  get hasComplemento4(): boolean {
    return this._hasPattern('c4');
  }

  get hasComplemento5(): boolean {
    return this._hasPattern('c5');
  }

  private _verify(property: any[]) {
    const verify = (a: string) => {
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

  private _hasPattern(atribute: string) {
    const props = [];
    this.info.forEach(lanc => {
      const prop = this._getProperty(lanc, atribute);
      if (prop) {
        props.push(prop);
      }
    });
    return this._verify(props);
  }

  private _getProperty(l: Lancamento, atribute: string) {
    let property: string;
    switch (atribute) {
      case 'fornecedor':
        property = l.descricao;
        break;
      case 'banco':
        property = l.portador;
        break;
      case 'data':
        property = l.dataMovimento;
        break;
      case 'valor':
        property = `${l.valorOriginal}`;
        break;
      case 'documento':
        property = l.documento;
        break;
      case 'nome':
        property = l.nomeArquivo;
        break;
      case 'planilha':
        property = l.tipoPlanilha;
        break;
      case 'c1':
        property = l.complemento01;
        break;
      case 'c2':
        property = l.complemento02;
        break;
      case 'c3':
        property = l.complemento03;
        break;
      case 'c4':
        property = l.complemento04;
        break;
      case 'c5':
        property = l.complemento05;
        break;
    }
    return property;
  }

}
