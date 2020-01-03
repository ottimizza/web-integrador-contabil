import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  OnInit
} from "@angular/core";
import { StringCutterUtils } from "@shared/utils/string-cutter.util";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-rule-configurator",
  templateUrl: "./rule-configurator.component.html",
  styles: [
    `
      i {
        float: right;
        margin-right: 30px;
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

  constructor(@Inject(DOCUMENT) private _document: Document) {}

  ngOnInit(): void {
    const selectElement: HTMLSelectElement = this._document.querySelector(
      "#selector"
    ) as HTMLSelectElement;
    selectElement.selectedIndex = this.selectorPreset;
    this._emit(selectElement.value);
  }

  text() {
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
    let content = `"${StringCutterUtils.cut(this.property, 45)}"`;
    if (this.continue) {
      content += ",";
    } else {
      content += ".";
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
