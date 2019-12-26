import { Component, Input, OnInit } from '@angular/core';
import { Transacao } from '../../transacao/transacao';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';

@Component({
    selector: 'ott-item',
    templateUrl: './timeline-item.component.html',
    styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent implements OnInit {

  @Input() transacao: Transacao;
  @Input() main = false;
  fornecedorStrong: string;
  fornecedorSpan: string;

  ngOnInit(): void {
    this.fornecedorSpan = StringCutterUtils.cut(this.transacao.fornecedor, 15);
    this.fornecedorStrong = StringCutterUtils.cut(this.transacao.fornecedor, 14);
  }
}
