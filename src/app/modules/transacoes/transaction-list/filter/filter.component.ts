import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BusinessService } from '@shared/services/business.service';
import { Empresa } from '@shared/models/Empresa';
import { ArrayUtils } from '@shared/utils/array.utils';
import { ToastService } from '@shared/services/toast.service';
import { debounceTime, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';

@Component({
  selector: 'app-tfilter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() empresa = new EventEmitter();
  word = '';
  business: Empresa[] = [];

  constructor(
    private _service: BusinessService,
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.change();
  }

  get info() {
    return 'Escreva o nome da empresa selecionada ou escolha dentre as sugeridas';
  }

  async confirm(company: Empresa) {
    this._toast.show(`Empresa ${company.razaoSocial} selecionada.`, 'primary');
    await this._delay(500);
    this.devolve(company);
  }

  private _delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  change() {
    const split = this.word.split(' - ');
    if (split.length > 1) {
      this._getEmpresas(split[0], split[1]);
    } else {
      this._getEmpresas(split[0], split[0]);
    }
  }

  private _getEmpresas(text1: string, text2: string) {
    const obs1$ = this._service.getBusiness(text2.toUpperCase());
    const obs2$ = this._service.getByErpCode(text1);

    const observable$ = combineLatest([obs1$, obs2$])
      .pipe(map(([companiesByName, companiesByErp]: GenericPageableResponse<Empresa>[]) => {
        return ArrayUtils.concatDifferentiatingProperty(companiesByName.records, companiesByErp.records, 'id') as Empresa[];
      }));

    const subscription = observable$.subscribe(data => {
      this.business = data;
      subscription.unsubscribe();
    });
  }

  devolve(e: Empresa) {
    this.empresa.emit(JSON.stringify(e));
  }

}
