import { Component, EventEmitter, Input, OnInit, Output, Inject, SimpleChanges, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ArrayUtils } from '@shared/utils/array.utils';
import { DateUtils } from '@shared/utils/date-utils';
import { LoggerUtils } from '@shared/utils/logger.utills';

interface Complements {
  c1: string[];
  c2: string[];
  c3: string[];
  c4: string[];
  c5: string[];
  l1: string,
  l2: string,
  l3: string,
  l4: string,
  l5: string;
}

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
  isSelected = false;
  comps: Complements;

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
    let name = this.name;
    if (name === 'Nome do Arquivo') {
      name = 'Nome';
    }
    return this._document.querySelectorAll(`.chip${name}`);
  }

  isDefault() {
    // Informa se os chips devem ser clicáveis ou não
    return (this.name !== 'Valor' && this.name !== 'Data');
    // return (this.name !== 'Valor' && this.name !== 'Data' && this.name !== 'Tipo da Planilha');
  }

  private _change() {
    /*
     * Caso seja data, a string será cortada por traço e serão adicionadas barras.
     * Caso seja valor, a string será transformada em um number, arredondada para duas casas decimais e o ponto será substituido por vírgula.
     * Caso sejam complementos, a string será transformada em um objeto interativo.
     * Caso seja banco, a string será cortada por espaço e por vírgula.
     * Nos outros casos, a string será cortada por espaço, por ponto e por vírgula.
     */
    if (this.property) {
      switch (this.name) {
        case 'Data':
          this.props = this._verifyWord(DateUtils.ymdToDmy(this.property).split('/'));
          break;
        case 'Valor':
          const value = (+this.property).toFixed(2).replace(/\./g, ',');
          this.props = [value];
          break;
        case 'Complementos':
          this.comps = JSON.parse(this.property);
          break;
        case 'Banco':
          const props = ArrayUtils.split(this.property, ' ', ',', '_');
          this.props = this._verifyWord(props);
          break;
        default:
          const array = ArrayUtils.split(this.property, ' ', '.', ',', '_');
          this.props = this._verifyWord(array);
      }
    }
  }

  private _deSelectAll() {
    // Desseleciona todos os chips do "input" e emite a informação de que eles estão vazios para o componente pai
    this.chips.forEach(chip => {
      chip.classList.remove('selected');
      chip.classList.add('chipDefault');
    });
    this.chipList = [];
    this.emit(this.name, undefined);
  }


  select(id: number, title: string) {
    const chip = this._document.getElementById(id + title);
    const prop = this.props[id];

    if (this._chipIsSelected(chip)) {
      // Desselecionar
      chip.classList.remove('selected');
      chip.classList.add('chipDefault');
      this.chipList.splice(this.chipList.indexOf(prop), 1);
      this.emit(title, this.chipList.length > 0 ? this.chipList : undefined);
    } else {
      // Selecionar
      chip.classList.remove('chipDefault');
      chip.classList.add('selected');
      this.chipList.push(prop);
      this.emit(title, this.chipList);
    }
  }

  emit(title: string, selecteds: string[]) {
    this.selectedInfos.emit({ title, selecteds });
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

    if (this._chipIsSelected(chip)) {
      // Desselecionar
      chip.classList.remove('selected');
      chip.classList.add('chipDefault');
      this.emit(title, undefined);
    } else {
      // Selecionar
      chip.classList.remove('chipDefault');
      chip.classList.add('selected');
      this.emit(title, [prop]);
    }

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
    const array = [];
    const forcada = (arr: string[], title: string) => {
      if (arr && arr.length) {
        arr.forEach(com => {
          array.push({ name: title, prop: com });
        });
      }
    };
    const c = this.comps;
    forcada(c.c1, 'c1');
    forcada(c.c2, 'c2');
    forcada(c.c3, 'c3');
    forcada(c.c4, 'c4');
    forcada(c.c5, 'c5');

    LoggerUtils.log(array);
    array.forEach(comp => {
      this.selectComp(comp.prop, comp.name);
    });
  }

  private _devolveAllPattern(title: string, selecteds: string, chips: NodeListOf<Element> = this.chips) {
    this.isSelected = !this.isSelected;
    // const chips = this.chips;
    let countSelected = 0;
    if (!this.isSelected) {
      countSelected++;
      chips.forEach(chip => {
        chip.classList.remove('chipDefault');
        chip.classList.add('selected');
      });
    } else {
      chips.forEach(chip => {
        chip.classList.add('chipDefault');
        chip.classList.remove('selected');
      });
    }

    if (countSelected < 1) {
      this.emit(title, undefined);
    } else {
      this.emit(title, selecteds ? [selecteds] : undefined);
    }
  }

  private _chipIsSelected(chip: HTMLElement) {
    return chip.classList.contains('selected');
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
