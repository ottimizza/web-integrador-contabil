import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BusinessService } from '@shared/services/business.service';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { Empresa } from '@shared/models/Empresa';

@Component({
  selector: 'app-tfilter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() empresa = new EventEmitter();
  word = '';
  suggestions: string[] = [];

  constructor(private _service: BusinessService) { }

  ngOnInit(): void {
    this.change();
  }

  get info() {
    return 'Escreva o nome da empresa selecionada ou escolha dentre as sugeridas';
  }

  change() {
    // alert(this.word);
    /*
     * ATENÇÃO:
     * Quando houver mais empresas cadastradas, verificar se este método realmente funciona.
     *
     * FUNCIONAMENTO ESPERADO:
     * Cada vez que a expressão inserida no filtro for alterada, deve ser realizado um novo request
     * com a nova expressão
     */

    const search = this.word.split(' - ')[1] ? this.word.split(' - ')[1].toUpperCase() : '';
    const word = this.word.toUpperCase()
    const subs = this._service
      .getBusiness(search)
      .subscribe(data => {
        this.suggestions = [];
        data.records.forEach(record => {
          const code = `${record.codigoERP} - ${record.razaoSocial}`;
          if (word === code) {
            this.devolve(record);
          }
          this.suggestions.push(code);
        });
        subs.unsubscribe();
      });
  }

  devolve(e: Empresa) {
    this.empresa.emit(JSON.stringify(e));
  }

}
