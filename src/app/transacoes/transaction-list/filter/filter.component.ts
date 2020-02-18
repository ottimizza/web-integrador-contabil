import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BusinessService } from '@shared/services/business.service';
import { Empresa } from '@shared/models/Empresa';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { ArrayUtils } from '@shared/utils/array.utils';
import { GenericPagination } from '@shared/interfaces/GenericPagination';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-tfilter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() empresa = new EventEmitter();
  word = '';
  suggestions: string[] = [];
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

  confirm(event: any) {
    const erp = event.target.value.split(' - ')[0];
    const business = this.business.filter(item => item.codigoERP === erp);
    this.devolve(business[0]);
  }

  change() {
    const split = this.word.split(' - ');
    if (split.length > 1) {
      this._getEmpresas(split[0], split[1]);
    } else {
      this._getEmpresas(split[0], split[0]);
    }

    // const search = this.word.split(' - ')[1] ? this.word.split(' - ')[1].toUpperCase() : '';
    // const word = this.word.toUpperCase();
    // const subs = this._service
    //   .getBusiness(search)
    //   .subscribe(data => {
    //     this.suggestions = [];
    //     data.records.forEach(record => {
    //       const code = `${record.codigoERP} - ${record.razaoSocial}`;
    //       if (word === code) {
    //         this.devolve(record);
    //       }
    //       this.suggestions.push(code);
    //     });
    //     subs.unsubscribe();
    //   });
  }

  private _getEmpresas(text1: string, text2: string) {
    const obs2 = this._service.getByErpCode(text1);
    const obs1 = this._service.getBusiness(text2.toUpperCase());
    const subs1 = obs1.subscribe(data1 => {

      const subs2 = obs2.subscribe(data2 => {

        const records: Empresa[] = ArrayUtils.sum(data1.records, data2.records);
        this.suggestions = [];
        this.business = records;
        if (records.length) {
          records.forEach(rec => {
            this.suggestions.push(`${rec.codigoERP} - ${rec.razaoSocial}`);
          });
        }
        subs2.unsubscribe();
      });

      subs1.unsubscribe();

    });
  }

  devolve(e: Empresa) {
    this.empresa.emit(JSON.stringify(e));
  }

}
