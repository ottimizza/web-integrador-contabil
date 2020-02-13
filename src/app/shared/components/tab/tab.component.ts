import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export enum TabButton {
  PAGAMENTO = 'pag',
  EXTRATO_DEBITO = 'expag',
  RECEBIMENTO = 'rec',
  EXTRATO_CREDITO = 'exrec'
}

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Output() clicked: EventEmitter<TabButton> = new EventEmitter();
  classes: string[];

  ngOnInit(): void {
    this._resetClasses();
  }

  get tabButton() {
    return TabButton;
  }

  click(position: number, button: TabButton) {
    this.update(position);
    this.clicked.emit(button);
  }

  update(position: number) {
    this._resetClasses();
    this.classes[position] = 'btn btn-info col';
  }

  private _resetClasses() {
    this.classes = [
      'btn btn-outline-link col',
      'btn btn-outline-link col',
      'btn btn-outline-link col',
      'btn btn-outline-link col'
    ];
  }

}
