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
  returningObject: any;

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
      chip.classList.remove('selected');
      const chiplistId = this.chipList.indexOf(prop);
      // this.chipList.splice(this.chipList.indexOf({ title, selecteds: prop}), 1);
      this.chipList.splice(chiplistId, 1);
      this.returningObject = { title, selecteds: this.chipList };
      this.selectedInfos.emit(this.chipList);
    } else {
      chip.classList.add('selected');
      this.chipList.push(prop);
      this.returningObject = { title, selecteds: this.chipList };
      this.selectedInfos.emit(this.returningObject);
    }

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


