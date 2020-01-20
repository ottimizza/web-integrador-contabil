import { Component, EventEmitter, Input, OnInit, Output, Inject, SimpleChanges, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { collectionForUtils } from '@shared/utils/collection-for.utils';
import { Lancamento } from '@shared/models/Lancamento';

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
  comps: any;

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

  isDefault() {
    // Informa se os chips devem ser clicáveis ou não
    return this.name !== 'Valor' && this.name !== 'Data';
  }

  private _change() {
    if (this.property) {
      if (this.name === 'Data') {
        const date = this.property.split('-');
        this.props = this._verifyWord([date[2], date[1], date[0]]);
      } else if (this.name === 'Valor') {
        this.props = [this.property];
      } else if (this.name === 'Complementos') {
        // Transforma a string passada na property em um objeto manipulável para ser possível realizar as verificações
        this.comps = JSON.parse(this.property);
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

  selectComp(prop: string, type: string) {
    const chip = this._document.getElementById(prop + ' ' + type);
    let title = '';
    if (type === 'c1') {
      title = 'Complemento 1';
    } else if (type === 'c2') {
      title = 'Complemento 2';
    } else if (type === 'c3') {
      title = 'Complemento 3';
    } else if (type === 'c4') {
      title = 'Complemento 4';
    } else if (type === 'c5') {
      title = 'Complemento 5';
    }

    if (chip.classList.contains('selected')) {
      // Desselecionar
      chip.classList.remove('selected');
      chip.classList.add('chipDefault');
      // this.chipList.splice(this.chipList.indexOf(prop), 1);
      // this.returningObject = { title, selecteds: this.chipList.length > 0 ? this.chipList : undefined };
      this.returningObject = { title, selecteds: undefined };
    } else {
      // Selecionar
      chip.classList.remove('chipDefault');
      chip.classList.add('selected');
      this.returningObject = { title, selecteds: [prop] };
    }
    this.selectedInfos.emit(this.returningObject);

  }

  info(chip?: string) {
    const title = ` "${this.name}".`;
    return {
      copy: 'Clique para selecionar o campo "' + chip + '" de' + title,
      copyAll: 'Clique duas vezes para selecionar todos os campos de' + title,
      c1: `Clique para selecionar "${chip}" de "Complemento 1"`,
      c2: `Clique para selecionar "${chip}" de "Complemento 2"`,
      c3: `Clique para selecionar "${chip}" de "Complemento 3"`,
      c4: `Clique para selecionar "${chip}" de "Complemento 4"`,
      c5: `Clique para selecionar "${chip}" de "Complemento 5"`
    };
  }

  devolveAll() {
    this._devolveAllPattern(this.name, this.property);
  }

  devolveAllComps() {
    const comps = this.comps;
    const c1 = comps.c1 ? comps.c1 : undefined;
    const c2 = comps.c2 ? comps.c2 : undefined;
    const c3 = comps.c3 ? comps.c3 : undefined;
    const c4 = comps.c4 ? comps.c4 : undefined;
    const c5 = comps.c5 ? comps.c5 : undefined;
    this._devolveAllCompsPattern('Complemento 1', c1);
    this._devolveAllCompsPattern('Complemento 2', c2);
    this._devolveAllCompsPattern('Complemento 3', c3);
    this._devolveAllCompsPattern('Complemento 4', c4);
    this._devolveAllCompsPattern('Complemento 5', c5);
  }

  private _devolveAllCompsPattern(name: string, prop: string) {
    this._devolveAllPattern(name, prop);
    if (name !== 'Complemento 5') {
      this.isSelected = !this.isSelected;
    }
  }

  private _devolveAllPattern(title: string, selecteds: string) {
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
      this.returningObject = { title, selecteds: undefined };
    } else if (countSelected > 0) {
      this.returningObject = { title, selecteds: [selecteds] };
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
