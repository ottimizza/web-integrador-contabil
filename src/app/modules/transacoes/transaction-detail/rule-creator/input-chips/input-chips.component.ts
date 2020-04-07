import { Component, EventEmitter, Input, OnInit, Output, Inject, SimpleChanges, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ArrayUtils } from '@shared/utils/array.utils';
import { DateUtils } from '@shared/utils/date-utils';
import { Complements } from './models/Complements';

@Component({
  selector: 'app-chips',
  templateUrl: './input-chips.component.html',
  styleUrls: ['./input-chips.component.scss']
})
export class InputChipsComponent implements OnInit, OnChanges {

  @Input() name: string;
  @Input() property: string;
  @Input() reset: boolean;
  @Input() title: string;
  @Output() selectedInfos = new EventEmitter();

  props: string[] = [];
  chipList: string[] = [];
  complementList: { title: string, prop: string }[] = [];
  isSelected = false;
  cis = { one: false, two: false, three: false, four: false, five: false };
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
    return this._document.querySelectorAll(`.chip${this.name}`);
  }

  getTitle() {
    return this.title ? this.title : this.name;
  }

  isDefault() {
    // Informa se os chips devem ser clicáveis ou não
    return (this.name !== 'Valor' && this.name !== 'Data');
  }

  private _change() {

    if (this.property) {

      switch (this.name) {
        case 'Data':
          this._dateInit();
          break;
        case 'Valor':
          this._valueInit();
          break;
        case 'Complementos':
          this._complementInit();
          break;
        case 'Banco':
          this._bankInit();
          break;
        default:
          this._defaultInit();
      }

    }
  }

  private _dateInit() {
    // Caso seja data, a string será cortada por traço e serão adicionadas barras.
    this.props = this._verifyWord(DateUtils.ymdToDmy(this.property).split('/'));
  }

  private _valueInit() {
    // Caso seja valor, a string será transformada em um number, arredondada para duas casas decimais e o ponto será substituido por vírgula.
    const value = (+this.property).toFixed(2).replace(/\./g, ',');
    this.props = [value];
  }

  private _complementInit() {
    // Caso sejam complementos, a string será transformada em um objeto interativo.
    this.comps = JSON.parse(this.property);
    this.comps.c1 = this._verifyWord(this.comps.c1 && this.comps.c1.length ? this.comps.c1 : []);
    this.comps.c2 = this._verifyWord(this.comps.c2 && this.comps.c2.length ? this.comps.c2 : []);
    this.comps.c3 = this._verifyWord(this.comps.c3 && this.comps.c3.length ? this.comps.c3 : []);
    this.comps.c4 = this._verifyWord(this.comps.c4 && this.comps.c4.length ? this.comps.c4 : []);
    this.comps.c5 = this._verifyWord(this.comps.c5 && this.comps.c5.length ? this.comps.c5 : []);
  }

  private _bankInit() {
    // Caso seja banco, a string será cortada por espaço e por vírgula.
    const props = ArrayUtils.split(this.property, ' ', ',', '_', '-');
    this.props = this._verifyWord(props);
  }

  private _defaultInit() {
    // Nos outros casos, a string será cortada por espaço, por ponto e por vírgula.
    const array = ArrayUtils.split(this.property, ' ', '.', ',', '_', '-');
    this.props = this._verifyWord(array);
  }

  private _deSelectAll() {
    const chips = document.querySelectorAll('.selected');
    this.deMark(chips);
    this.chipList = [];
    this.emit('Limpando', undefined, true);
  }


  select(id: number, title: string) {
    const chip = this._document.getElementById(id + title);
    const prop = this.props[id];

    if (this._chipIsSelected(chip)) {
      // Desselecionar
      this.primitiveDeMark(chip);
      this.chipList.splice(this.chipList.indexOf(prop), 1);
      this.emit(title, this.chipList.length > 0 ? this.chipList : undefined);
    } else {
      // Selecionar
      this.primitiveMark(chip);
      this.chipList.push(prop);
      this.emit(title, this.chipList);
    }
  }

  emit(title: string, selecteds: string[], clear?: boolean) {
    this.selectedInfos.emit({ title, selecteds, clear });
  }

  selectComp(prop: string, type: string, completeSentence: string, allProps: string[]) {
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

    if (!this._chipIsSelected(chip)) {
      this.primitiveMark(chip);
      this.complementList.push({ prop, title });
    } else {
      this.primitiveDeMark(chip);
      this.splice(prop, completeSentence, allProps, title);
    }
    const emitter = this.complementList
      .filter(comp => comp.title === title)
      .map(comp => comp.prop);
    const emitterValue = (emitter && emitter.length) ? emitter : undefined;
    this.emit(title, emitterValue);
  }

  splice(prop: string, completeSentence: string, allProps: string[], title: string) {
    let index: number;
    this.complementList.forEach((comp, id) => {
      if (comp.prop === completeSentence && comp.title === title) {
        index = id;
      }
    });

    if (index !== undefined) {
      this.complementList.splice(index, 1);
      allProps.forEach(ap => this.complementList.push({ title, prop: ap }));
    }

    let newIndex: number;
    this.complementList.forEach((comp, id) => {
      if (comp.prop === prop && comp.title === title) {
        newIndex = id;
      }
    });
    this.complementList.splice(newIndex, 1);
  }

  info(chip?: string, label?: string) {
    const title = ` "${this.title ? this.title : this.name}".`;
    return {
      copy: 'Clique para selecionar o campo "' + chip + '" de' + title,
      copyAll: 'Clique duas vezes para selecionar todos os campos de' + title,
      comps: `Clique para selecionar "${chip}" de "${label}".`,
    };
  }

  selectComp1() {
    this.cis.one = !this.cis.one;
    this._selectAllCompPattern(this.comps.l1, this.cis.one, 'Complemento 1', this.comps.complete1);
  }

  selectComp2() {
    this.cis.two = !this.cis.two;
    this._selectAllCompPattern(this.comps.l2, this.cis.two, 'Complemento 2', this.comps.complete2);
  }

  selectComp3() {
    this.cis.three = !this.cis.three;
    this._selectAllCompPattern(this.comps.l3, this.cis.three, 'Complemento 3', this.comps.complete3);
  }

  selectComp4() {
    this.cis.four = !this.cis.four;
    this._selectAllCompPattern(this.comps.l4, this.cis.four, 'Complemento 4', this.comps.complete4);
  }

  selectComp5() {
    this.cis.five = !this.cis.five;
    this._selectAllCompPattern(this.comps.l5, this.cis.five, 'Complemento 5', this.comps.complete5);
  }

  private _selectAllCompPattern(label: string, isAlreadySelected: boolean, title: string, completeSentence: string) {

    const chips = this._document.querySelectorAll('.chip' + label);
    if (!isAlreadySelected) {
      this.mark(chips);
      this.complementList.push({ title, prop: completeSentence });
      this.emit(title, [completeSentence]);
    } else {
      this.deMark(chips);
      this.complementList.splice(this.chipList.indexOf(completeSentence), 1);
      const array = this.complementList.filter(comp => comp.title === title);
      array.forEach(arr => {
        if (this.complementList.includes(arr)) {
          this.complementList.splice(this.complementList.indexOf(arr), 1);
        }
      });
      this.emit(title, undefined);
    }

  }

  devolveAll() {
    this.isSelected = !this.isSelected;
    let countSelected = 0;
    if (!this.isSelected) {
      countSelected++;
      this.mark(this.chips);
    } else {
      this.deMark(this.chips);
    }

    if (countSelected < 1) {
      this.emit(this.name, undefined);
    } else {
      this.emit(this.name, this.property ? [this.property] : undefined);
    }
  }

  private mark(chips: NodeListOf<Element>) {
    chips.forEach(chip => {
      this.primitiveMark(chip);
    });
  }

  private deMark(chips: NodeListOf<Element>) {
    chips.forEach(chip => {
      this.primitiveDeMark(chip);
    });
  }

  primitiveMark(chip: Element | HTMLElement) {
    chip.classList.remove('chipDefault');
    chip.classList.add('selected');
  }

  primitiveDeMark(chip: Element | HTMLElement) {
    chip.classList.remove('selected');
    chip.classList.add('chipDefault');
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

    return words.filter(word => !list.includes(word.toLowerCase()));

  }

}
