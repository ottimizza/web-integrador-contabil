import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { BusinessService } from '@shared/services/business.service';
import { Empresa } from '@shared/models/Empresa';
import { ToastService } from '@shared/services/toast.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { CNPJUtils } from '@shared/utils/docs.utils';
import { GlobalVariableService } from '@app/services/global-variables.service';

@Component({
  selector: 'app-breadcrumb-input-filter',
  templateUrl: './breadcrumb-input-filter.component.html',
  styleUrls: ['./breadcrumb-input-filter.component.scss'],
  // Encapsulation has to be disabled in order for the
  // component style to apply to the select panel.
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbInputFilterComponent implements OnInit, AfterViewInit {

  public HELP_MESSAGE = `
    Escreva o nome da empresa selecionada ou escolha dentre as sugeridas.
  `;

  public VARIABLE_KEY = 'company_selected';


  @Output() empresa = new EventEmitter();

  business: Empresa[] = [];
  searchTerms = new Subject<string>();

  @ViewChild('company') companyInput: ElementRef<HTMLInputElement>;


  constructor(
    private _service: BusinessService,
    private _toast: ToastService,
    private _variables: GlobalVariableService
  ) { }

  private storeEmpresaSelecionada(empresa: Empresa): void {

  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    value = value || '';
    if (typeof value === 'string') {
      value = value.toUpperCase();
      this.companyInput.nativeElement.value = value;
      this.searchTerms.next(value);
    }
  }


  public clear() {
    this._variables.deleteVariable(this.VARIABLE_KEY, true);
    this.companyInput.nativeElement.value = '';
  }

  public select(event: MatAutocompleteSelectedEvent) {
    const empresaSelecionada: Empresa = event.option.value as Empresa;
    this.confirm(event.option.value);
  }

  async confirm(empresa: Empresa): Promise<void> {
    const displayName = `${this.getEmpresaDisplayName(empresa)}`;
    this.companyInput.nativeElement.value = displayName;
    await this._variables.setVariable(this.VARIABLE_KEY, empresa, true);
    this._toast.show(`Empresa ${displayName} selecionada.`, 'primary');
    await new Promise(resolve => setTimeout(resolve, 300));
    this.devolve(empresa);
  }

  setEmpresaSelecionada(empresa: Empresa): void {
    const displayName = `${this.getEmpresaDisplayName(empresa)}`;
  }


  //
  getCompanies(nomeCompleto: string) {
    return this._service.fetch({ nomeCompleto, pageSize: 5 })
      .toPromise();
  }

  public getEmpresaDisplayName(empresa: Empresa): string {
    const dn = `${(empresa.codigoERP && empresa.codigoERP !== 'null') ? empresa.codigoERP + ' - ' : ''}${empresa.razaoSocial || ''}`.toUpperCase().trim();
    return dn;
  }

  public getEmpresaDisplayCnpj(empresa: Empresa): string {
    return CNPJUtils.isValid(empresa.cnpj) ? CNPJUtils.applyMask(empresa.cnpj) : empresa.cnpj;
  }

  async change(word: string) {
    const rs = await this.getCompanies(word);
    this.business = rs.records;
  }


  private devolve(empresa: Empresa): void {
    this.empresa.emit(JSON.stringify(empresa));
  }

  ngAfterViewInit() {
    const empresa = this._variables.getVariable(this.VARIABLE_KEY);
    if (empresa) {
      this.confirm(empresa);
    }
  }

  ngOnInit(): void {
    this.change('');
    this.searchTerms
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe(e => this.change(e));
  }

}
