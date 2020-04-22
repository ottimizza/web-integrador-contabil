import { Component, Input, OnInit } from '@angular/core';
import { IChipGroupPattern, IChipGroupParcialPattern } from './patterns/IChipGroupPattern';
import { ArrayUtils } from '@shared/utils/array.utils';

export class RuleConfig {
  title: string;
  selectable: boolean;
  values: { key: string, value: string, pattern: IChipGroupPattern, label?: string }[];
}

@Component({
  selector: 'app-chips-group',
  templateUrl: './chips-group.component.html',
  styleUrls: ['./chips-group.component.scss']
})
export class RuleChipGroupComponent implements OnInit {

  @Input() config: RuleConfig;

  chipLists: { key: string, selectable: boolean, fullValue: string, chipValue: string[], pattern: IChipGroupParcialPattern, label?: string }[] = [];

  ngOnInit(): void {
    this._parse();
  }

  parcialPattern(pattern: IChipGroupPattern): IChipGroupParcialPattern {
    const treatment = (chip: string) => chip;
    return {
      treatment: pattern.treatment || treatment,
      intersect: pattern.intersect,
      starting: pattern.starting,
      ending: pattern.ending
    };
  }

  onDevolve(event: { label: string, isSelected: boolean, position: number }) {

  }

  private _parse() {
    this.chipLists = this.config.values.map(config => {
      let chipValue = ArrayUtils.split(config.value, ...config.pattern.separators);
      if (config.pattern.sort) {
        chipValue = config.pattern.sort(chipValue);
      }
      return {
        pattern: this.parcialPattern(config.pattern),
        selectable: this.config.selectable,
        fullValue: this.config.title,
        label: config.label,
        key: config.key,
        chipValue
      };
    });
  }

}
