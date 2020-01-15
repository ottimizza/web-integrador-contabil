import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ArrayUtils } from '@shared/utils/array.utils';
import { DocumentDetectorUtils } from '@shared/utils/doc-detector.utils';

@Component({
  selector: 'app-chips',
  templateUrl: './input-chips.component.html',
  styleUrls: ['./input-chips.component.scss']
})
export class InputChipsComponent implements OnInit {

  @Input() name: string;
  @Input() property: string;
  @Output() selectedInfos = new EventEmitter();
  props: string[] = [];
  chipList: string[] = [];
  returningObject: any = { title: this.name, selecteds: undefined };
  isSelected = false;

  constructor(@Inject(DOCUMENT) private _document: Document) {}

  ngOnInit(): void {
    if (this.property) {
      if (this.name === 'Data') {
        const date = this.property.split('-');
        this.props = this._verifyWord([date[2], date[1], date[0]]);
      } else if (this.name === 'Valor') {
        this.props.push(this.property);
      } else {
        this.props = this._verifyWord(this.property.split(' '));
      }
    }
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

  // devolveAll() {
  //   const chips: HTMLCollectionOf<Element> = this._document.getElementsByClassName('chip' + this.name);
  //   let countSelected = 0;
  //   // tslint:disable-next-line: prefer-for-of
  //   for (let i = 0; i < chips.length; i++) {
  //     if (chips[i].classList.contains('selected')) {
  //       chips[i].classList.remove('selected');
  //       chips[i].classList.add('chipDefault');
  //     } else {
  //       countSelected++;
  //       chips[i].classList.remove('chipDefault');
  //       chips[i].classList.add('selected');
  //     }
  //   }

  //   if (countSelected === 0) {
  //     this.returningObject = { title: this.name, selecteds: undefined };
  //   } else if (countSelected > 0) {
  //     this.returningObject = { title: this.name, selecteds: [this.property] };
  //   }

  //   this.selectedInfos.emit(this.returningObject);
  // }

  devolveAll() {
    this.isSelected = !this.isSelected;
    const chips: HTMLCollectionOf<Element> = this._document.getElementsByClassName('chip' + this.name);
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


