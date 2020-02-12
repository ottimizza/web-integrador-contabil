import { Component, EventEmitter, Input, OnInit, Output, Inject, SimpleChanges, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { collectionForUtils } from '@shared/utils/collection-for.utils';
import { ArrayUtils } from '@shared/utils/array.utils';

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
  returningObject = { title: this.name, selecteds: undefined };
  isSelected = false;
  comps: any;

  // tslint:disable-next-line: variable-name
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
    return (this.name !== 'Valor' && this.name !== 'Data' && this.name !== 'Tipo da Planilha');
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
        const array = ArrayUtils.split(this.property, ' ', '.', ',');
        this.props = this._verifyWord(array);
      }
    }
  }

  private _deSelectAll() {
    // Desseleciona todos os chips do "input" e emite a informação de que eles estão vazios para o componente pai
    const chips = this.chips;
    collectionForUtils(chips, false, 'selected');
    collectionForUtils(chips, true, 'chipDefault');
    this.chipList = [];
    this.returningObject = { title: this.name, selecteds: undefined };
    this.emit();
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
    this.emit();
  }

  emit() {
    // console.log(this.returningObject.title);
    // console.log(this.returningObject.selecteds);
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
      this.returningObject = { title, selecteds: undefined };
    } else {
      // Selecionar
      chip.classList.remove('chipDefault');
      chip.classList.add('selected');
      this.returningObject = { title, selecteds: [prop] };
    }
    this.selectedInfos.emit(this.returningObject);

  }

  info(chip?: string, label?: string) {
    const title = ` "${this.name}".`;
    return {
      copy: 'Clique para selecionar o campo "' + chip + '" de' + title,
      copyAll: 'Clique duas vezes para selecionar todos os campos de' + title,
      comps: `Clique para selecionar "${chip}" de "${label}".`,
    };
  }

  devolveAll() {
    this._devolveAllPattern(this.name, this.property);
  }

  devolveAllComps() {
    const c = this.comps;
    const comps = [
      { name: 'Complemento 1', prop: c.c1 ? c.c1 : undefined },
      { name: 'Complemento 2', prop: c.c2 ? c.c2 : undefined },
      { name: 'Complemento 3', prop: c.c3 ? c.c3 : undefined },
      { name: 'Complemento 4', prop: c.c4 ? c.c4 : undefined },
      { name: 'Complemento 5', prop: c.c5 ? c.c5 : undefined },
    ];

    comps.forEach(comp => {
      this._devolveAllCompsPattern(comp.name, comp.prop);
    });
  }

  private _devolveAllCompsPattern(name: string, prop: string) {
    this._devolveAllPattern(name, prop);
    if (name !== 'Complemento 5') {
      // Reseta a variável que foi alterada pelo _devolveAllPattern() para que ela esteja imediatamente pronta para a próxima ação
      // sem precisar passar por tratamentos.
      this.isSelected = !this.isSelected;
    }
  }

  private _devolveAllPattern(title: string, selecteds: string) {
    this.isSelected = !this.isSelected;
    const chips = this.chips;
    let countSelected = 0;
    if (!this.isSelected) {
      countSelected++;
      collectionForUtils(chips, false, 'chipDefault');
      collectionForUtils(chips, true, 'selected');
    } else {
      collectionForUtils(chips, false, 'selected');
      collectionForUtils(chips, true, 'chipDefault');
    }

    if (countSelected < 1) {
      this.returningObject = { title, selecteds: undefined };
    } else {
      this.returningObject = { title, selecteds: [selecteds] };
    }

    this.emit();
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
