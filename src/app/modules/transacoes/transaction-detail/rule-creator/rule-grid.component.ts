import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LancamentoService } from '@shared/services/lancamento.service';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { ToastService } from '@shared/services/toast.service';
import { Lancamento } from '@shared/models/Lancamento';
import { PostFormatRule } from '@shared/models/Rule';
import { Empresa } from '@shared/models/Empresa';
import { finalize } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  templateUrl: './rule-grid.component.html'
})
export class RuleGridComponent implements OnInit {

  info: Lancamento[];
  pageInfo: PageInfo;
  page = 0;
  isFetching = false;


  constructor(
    public dialogRef: MatDialogRef<RuleGridComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: LancamentoService,
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.info = [];
    this.nextPage();
  }

  nextPage(pageSize = 5): void {
    if (this.hasNext()) {
      this.isFetching = true;
      this._toast.showSnack('Aguardando resposta');
      const searchCriteria = { cnpjEmpresa: this.data.company.cnpj, pageIndex: this.page, pageSize, tipoConta: 0, ativo: true };
      this._service
        .fetchByRule(this.data.rules, searchCriteria)
        .pipe(finalize(() => this.isFetching = false))
        .subscribe(imports => {
          this.info = imports.records;
          this.pageInfo = imports.pageInfo;
          // this.page++;
          this._toast.hideSnack();
        });
    }
  }

  hasNext() {
    return !this.pageInfo || this.pageInfo.hasNext;
  }

  onScroll(event: PageEvent) {
    this.page = event.pageIndex;
    this.nextPage(event.pageSize);
  }

  getValue(value: number) {
    const props = value.toString().split('.');
    props[1] = props[1] || '00';
    return `R$ ${props[0]},${props[1]}`;
  }

  displayedColumns() {
    const array = [];

    [
      { if: this.hasFonecedor, do: 'descricao' },
      { if: this.hasBanco, do: 'portador' },
      { if: this.hasData, do: 'dataMovimento' },
      { if: this.hasValor, do: 'valorOriginal' },
      { if: this.hasDocumento, do: 'documento' },
      { if: this.hasNomeArquivo, do: 'nomeArquivo' },
      { if: this.hasComplemento1, do: 'complemento01' },
      { if: this.hasComplemento2, do: 'complemento02' },
      { if: this.hasComplemento3, do: 'complemento03' },
      { if: this.hasComplemento4, do: 'complemento04' },
      { if: this.hasComplemento5, do: 'complemento05' }
    ].forEach(rec => {
      if (rec.if) {
        array.push(rec.do);
      }
    });

    return array;
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
    return this._hasPattern('nomeArquivo');
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
