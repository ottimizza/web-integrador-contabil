import { Component, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { collectionForUtils } from '@shared/utils/collection-for.utils';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {

  @Input() main: boolean;
  @Input() destroy: boolean;

  constructor(@Inject(DOCUMENT) private _document: Document) { }

  public ngOnChanges(changes: SimpleChanges) {
      for (const key in changes) {
        if (changes.hasOwnProperty(key)) {
          switch (key) {
            case 'destroy':
              if (this.destroy === true) {
                this.destroyEffects();
              } else {
                this.removeDestroyEffects();
              }
              break;
        }
      }
    }
  }

  get cards(): HTMLCollectionOf<Element> {
    return this._document.getElementsByClassName('cardStyle');
  }

  destroyEffects() {
    collectionForUtils(this.cards, true, 'destroyedCard');
  }

  removeDestroyEffects() {
    collectionForUtils(this.cards, false, 'destroyedCard');
  }

  padding() {
    if (this.main) {
      return '10px';
    } else {
      return '0';
    }
  }


}
