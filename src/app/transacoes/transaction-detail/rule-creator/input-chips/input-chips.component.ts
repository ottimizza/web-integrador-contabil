import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './input-chips.component.html',
  styleUrls: ['./input-chips.component.scss']
})
export class InputChipsComponent implements OnInit {

  @Input() title: string;
  @Input() property: string;
  @Output() valueEmitter = new EventEmitter();
  props: string[] = [];

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

  devolve(name: string, property: string) {
    let selectorPreset: number;

    if (this.props.length === 1) {
      selectorPreset = 0;
    } else if (this.props.indexOf(property) === 0) {
      selectorPreset = 1;
    } else {
      selectorPreset = 2;
    }

    this.valueEmitter.emit({name, property, selectorPreset});
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


