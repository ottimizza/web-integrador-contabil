import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IChipGroupPattern, IChipGroupParcialPattern } from './patterns/IChipGroupPattern';
import { ArrayUtils } from '@shared/utils/array.utils';

export class RuleConfig {
  title: string;
  selectable: boolean;
  values: { key: string, value: string, pattern: IChipGroupPattern, label: string }[];
}

class ChipList {
  key: string;
  selectable: boolean;
  fullValue: string;
  chipValue: string[];
  pattern: IChipGroupParcialPattern;
  label: string;
}

@Component({
  selector: 'app-chips-group',
  templateUrl: './chips-group.component.html',
  styleUrls: ['./chips-group.component.scss']
})
export class RuleChipGroupComponent implements OnInit {

  @Input() config: RuleConfig;
  @Output() clicked = new EventEmitter();

  chipLists: ChipList[] = [];
  selecteds: { id: string, positions: number[] }[] = [];

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
    // TODO: ALTERAR O MÉTODO PARA QUE ELE DIFERENCIE OS VALORES ATIVOS E INATIVOS LEVANDO EM CONTA O isSelect DO EVENT!
    const id = this.config.values.filter(val => val.label === event.label)[0].key;

    const index = this.selecteds.map(sel => sel.id).indexOf(id);
    if (index < 0) {
      this.selecteds.push({ id, positions: [event.position] });
    } else {
      const positions = this.selecteds[index].positions;
      if (positions.includes(event.position)) {
        positions.splice(positions.indexOf(event.position), 1);
      } else {
        positions.push(event.position);
      }
      this.selecteds[index].positions = positions;
    }

    this.clicked.emit(this._map());
  }

  private _map() {
    return this.selecteds.map(sel => {
      const chipList = this.chipLists.filter(cl => cl.key === sel.id)[0];
      const selecteds = sel.positions.map(pos => chipList.chipValue[pos]);
      return {
        title: sel.id,
        selecteds
      };
    })
      .map(item => {
        const chipList = this.chipLists.filter(cl => cl.key === item.title)[0];
        if (item.selecteds.length === chipList.chipValue.length) {
          return {
            title: item.title,
            selecteds: [chipList.fullValue]
          };
        }
        return item;
      });
  }

  private _parse() {
    this.chipLists = this.config.values.map(config => {
      let chipValue = ArrayUtils.split(config.value, ...config.pattern.separators);

      if (config.pattern.treatment) {
        chipValue = chipValue.filter(chip => config.pattern.treatment(chip) !== null);
      }
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