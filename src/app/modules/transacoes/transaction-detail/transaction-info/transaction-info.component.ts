import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
    selector: 'ott-tinfo',
    templateUrl: './transaction-info.component.html',
    styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent implements OnInit {

    @Input() titulo: string;
    @Input() valor: string;
    @Input() ativado = false;

    ngOnInit(): void {
      if (!this.valor) {
        this.valor = '';
      }
    }

}
