import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-chips',
  templateUrl: './input-chips.component.html',
  styleUrls: ['./input-chips.component.scss']
})
export class InputChipsComponent implements OnInit {

  @Input() title: string;
  @Input() property: string;
  @Output() selectedInfos = new EventEmitter();
  props: string[] = [];
  chipList: string[] = [];
  returningObject: any = { title: this.title, selecteds: undefined };

  constructor(@Inject(DOCUMENT) private _document: Document) {}

  ngOnInit(): void {
    if (this.property) {
      if (this.title === 'Data') {
        this.props = this._verifyWord(this.property.split('/'));
      } else if (this.title === 'Documento') {
        const doc1: string[] = this.property.split('-')[0].split('.');
        doc1.push(this.property.split('-')[1]);
        this.props = this._verifyWord(doc1);
      } else if (this.title === 'Valor') {
        this.props.push(this.property);
      } else {
        this.props = this._verifyWord(this.property.split(' '));
      }
    }
  }

  // devolve(name: string, property: string) {
  //   let selectorPreset: number;

  //   if (this.props.length === 1) {
  //     selectorPreset = 0;
  //   } else if (this.props.indexOf(property) === 0) {
  //     selectorPreset = 1;
  //   } else {
  //     selectorPreset = 2;
  //   }

  //   this.valueEmitter.emit({name, property, selectorPreset});
  // }

  select(id: number, title: string) {
    const chip = this._document.getElementById(id + title);
    const prop = this.props[id];

    if (chip.classList.contains('selected')) {
      // Desselecionar
      chip.classList.remove('selected');
      chip.classList.add('chipDefault');
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

  devolveAll() {
    const chips: HTMLCollectionOf<Element> = this._document.getElementsByClassName('chip' + this.title);
    let countSelected = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < chips.length; i++) {
      if (chips[i].classList.contains('selected')) {
        chips[i].classList.remove('selected');
        chips[i].classList.add('chipDefault');
      } else {
        countSelected++;
        chips[i].classList.remove('chipDefault');
        chips[i].classList.add('selected');
      }
    }

    if (countSelected === 0) {
      this.returningObject = { title: this.title, selecteds: undefined };
    } else if (countSelected > 0) {
      this.returningObject = { title: this.title, selecteds: [this.property] };
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
      'a',
      'o',
      'é',
      'à',
      'as',
      'os',
      'em',
      'que',
      'ao',
      'às'
    ];

    const returningArray: string[] = [];

    words.forEach(word => {
      if (!list.includes(word.toLowerCase())) {
        returningArray.push(word);
      }
    });
    return returningArray;
  }

}


