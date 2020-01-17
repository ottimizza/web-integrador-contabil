import { Component, EventEmitter, Input, OnInit, Output, Inject, SimpleChanges, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { collectionForUtils } from '@shared/utils/collection-for.utils';

@Component({
  selector: 'app-chips',
  templateUrl: './input-chips.component.html',
  styleUrls: ['./input-chips.component.scss']
})
export class InputChipsComponent implements OnInit, OnChanges {

  @Input() name: string;
  @Input() property: string;
  @Input() reset: boolean;
  @Output() selectedInfos = new EventEmitter();
  props: string[] = [];
  chipList: string[] = [];
  returningObject: any = { title: this.name, selecteds: undefined };
  isSelected = false;

  constructor(@Inject(DOCUMENT) private _document: Document) {}

  ngOnInit(): void {
    this._change();
  }

  public ngOnChanges(changes: SimpleChanges) {
      for (const key in changes) {
        if (changes.hasOwnProperty(key)) {
          switch (key) {
            case 'name':
              this.name = changes[key].currentValue;
              break;
            case 'property':
              this.property = changes[key].currentValue;
              this._change();
              break;
            case 'reset':
              if (this.reset) {
                // this.devolveAll();
                this._deSelectAll();
              }
              break;
        }
      }
    }
  }

  get chips() {
    return this._document.getElementsByClassName('chip' + this.name);
  }

  private _change() {
    if (this.property) {
      if (this.name === 'Data') {
        const date = this.property.split('-');
        this.props = this._verifyWord([date[2], date[1], date[0]]);
      } else if (this.name === 'Valor') {
        this.props = [this.property];
      } else {
        this.props = this._verifyWord(this.property.split(' '));
      }
    }
  }

  private _deSelectAll() {
    // Desseleciona todos os chips do "input" e emite a informação de que eles estão vazios para o componente pai
    const chips = this.chips;
    collectionForUtils(chips, false, 'selected');
    collectionForUtils(chips, true, 'chipDefault');
    this.returningObject = { title: this.name, selecteds: undefined };
  }


  select(id: number, title: string) {
    const chip = this._document.getElementById(id + title);
    const prop = this.props[id];

    if (chip.classList.contains('selected')) {
      // Desselecionar
      chip.classList.remove('selected');
      chip.classList.add('chipDefault');
      this.chipList.splice(this.chipList.indexOf(prop), 1);
      this.returningObject = { title, selecteds: this.chipList.length > 0 ? this.chipList : undefined };
    } else {
      // Selecionar
      chip.classList.remove('chipDefault');
      chip.classList.add('selected');
      this.chipList.push(prop);
      this.returningObject = { title, selecteds: this.chipList };
    }
    this.selectedInfos.emit(this.returningObject);
  }

  info(chip?: string) {
    const title = ` "${this.name}".`;
    return {
      copy: 'Clique para selecionar o campo "' + chip + '" de' + title,
      copyAll: 'Clique duas vezes para selecionar todos os campos de' + title
    };
  }

  devolveAll() {
    this.isSelected = !this.isSelected;
    const chips = this.chips;
    let countSelected = 0;
    // tslint:disable: prefer-for-of
    for (let i = 0; i < chips.length; i++) {
      if (this.isSelected) {
        chips[i].classList.remove('selected');
        chips[i].classList.add('chipDefault');
      } else {
        countSelected++;
        chips[i].classList.remove('chipDefault');
        chips[i].classList.add('selected');
      }
    }

    if (countSelected === 0) {
      this.returningObject = { title: this.name, selecteds: undefined };
    } else if (countSelected > 0) {
      this.returningObject = { title: this.name, selecteds: [this.property] };
    }

    this.selectedInfos.emit(this.returningObject);
  }

  private _verifyWord(words: string[]) {
    const list = [
      '-',
      'ou',
      'e',
      'de',
      'do',
      'da',
      'das',
      'dos',
      'no',
      'na',
      'nos',
      'nas',
      'a',
      'à',
      'o',
      'é',
      'as',
      'os',
      'em',
      'que',
      'ao',
      'às'
    ];

    return words.filter(word => {
     return !list.includes(word.toLowerCase());
    });

  }

}


