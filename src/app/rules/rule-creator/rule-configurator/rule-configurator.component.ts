import { Component, Input, Output, EventEmitter, Inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';
import { DOCUMENT } from '@angular/common';
import { HashMapUtils } from '@shared/utils/hash-map.utils';

@Component({
  selector: 'app-rule-configurator',
  templateUrl: './rule-configurator.component.html',
  styles: [
    `
      i {
        transition: 320ms;
      }
      i:hover {
        font-weight: bold;
      }
      select {
        height: 100%;
      }
    `
  ]
})
export class RuleConfiguratorComponent implements OnInit {

  @Input() name: string;
  @Input() property: string;
  @Input() isFirst: boolean;
  @Input() continue: boolean;
  @Input() id: number;
  @Input() selectorPreset: number;
  @Output() situation = new EventEmitter();
  @Output() close = new EventEmitter();

  // tslint:disable-next-line: variable-name
  constructor(@Inject(DOCUMENT) private _document: Document) {}

  ngOnInit(): void {
    const selectElement: HTMLSelectElement = this._document.getElementsByTagName('select')[this.id] as HTMLSelectElement;
    selectElement.selectedIndex = this.selectorPreset;
    this._emit(selectElement.value);
  }

  get text() {
    if (this.isFirst) {
      return `Se ${this.name.toLowerCase()}`;
    } else {
      return `e ${this.name.toLowerCase()}`;
    }
  }

  turnOff() {
    this.close.emit(this.id);
  }

  select(event: any) {
    this._emit(event.target.value);
  }

  get content() {
    let content = `"${StringCutterUtils.cut(this.property, 40)}"`;
    if (this.continue) {
      content += ',';
    } else {
      content += '.';
    }
    return content;
  }

  private _emit(condition: string) {
    this.situation.emit({
      value: this.property,
      name: this.name,
      condition
    });
  }
}
