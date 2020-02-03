import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BusinessService } from '@shared/services/business.service';
import { Empresa } from '@shared/models/Empresa';
import { PageInfo, GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { Observable } from 'rxjs';
import { ArrayUtils } from '@shared/utils/array.utils';

@Component({
  selector: 'app-tfilter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() empresa = new EventEmitter();
  word = '';
  pageInfo: PageInfo;
  suggestions: string[] = [];

  constructor(private _service: BusinessService) { }

  ngOnInit(): void {
    this.change();
  }

  get info() {
    return 'Escreva o nome da empresa selecionada ou escolha dentre as sugeridas';
  }

  confirm(event: any) {
    const selected = event.target.value.split(' - ');
    this._getEmpresas(selected[0], selected[1], true);
  }

  change() {
    /*
     ! ATENÇÃO:
     TODO Quando houver mais empresas cadastradas, verificar se este método realmente funciona.

     ! FUNCIONAMENTO ESPERADO:
     ! Cada vez que a expressão inserida no filtro for alterada, deve ser realizado um novo request
     ! com a nova expressão
     */

    const split = this.word.split(' - ');
    if (split.length > 1) {
      this._getEmpresas(split[0], split[1], false);
    } else {
      this._getEmpresas(split[0], split[0], false);
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

  private _getEmpresas(text1: string, text2: string, confirm: boolean) {
    const obs2 = this._service.getByErpCode(text1);
    const obs1 = this._service.getBusiness(text2);
    const word = this.word.toUpperCase();
    const subs1 = obs1.subscribe(data1 => {

      const subs2 = obs2.subscribe(data2 => {
        if (confirm) {
          this.devolve(data2.records[0]);
        } else {
          const records: Empresa[] = ArrayUtils.sum(data1.records, data2.records);
          this.suggestions = [];
          if (records.length) {
            records.forEach(rec => {
              this.suggestions.push(`${rec.codigoERP} - ${rec.razaoSocial}`);
            });
          }
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
