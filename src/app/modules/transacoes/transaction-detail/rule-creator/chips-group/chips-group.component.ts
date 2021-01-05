import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { IChipGroupPattern, IChipGroupParcialPattern } from './patterns/IChipGroupPattern';
import { ArrayUtils } from '@shared/utils/array.utils';
import { ProposedRulesService } from '@app/http/proposed-rules/proposed-rules.service';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ProposedRule } from '@shared/models/Rule';
import { Lancamento } from '@shared/models/Lancamento';
import { RuleService } from '@shared/services/rule.service';
import { ToastService } from '@shared/services/toast.service';
import { TimeUtils } from '@shared/utils/time.utils';

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
export class RuleChipGroupComponent implements OnInit, AfterViewInit {

  @Input() config: RuleConfig;
  @Output() clicked = new EventEmitter();

  @ViewChild('fakeInput')
  public el: ElementRef<HTMLDivElement>;

  @ViewChild('trigger')
  private trigger: MatMenuTrigger;

  @ViewChild('triggerButton', { static: true })
  private triggerButton: ElementRef<HTMLButtonElement>;

  chipLists: ChipList[] = [];
  selecteds: { id: string, positions: number[] }[] = [];
  impositive: boolean[];

  public hasProposedRule = false;

  constructor(
    private service: RuleService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit() {
    this.service.reconstructionEnded(() => {
      const elements = this.el.nativeElement.querySelectorAll<HTMLDivElement>('.simple-chip');
      let chips: { label: string, isSelected: boolean, position: number }[] = [];
      elements.forEach(val => {
        const chipValue = val.innerText;
        let isSelected = val.classList.contains('chip-selected');
        if (isSelected && this.service.alreadyUsedRules.includes(chipValue)) {
          val.classList.remove('chip-selected');
          isSelected = false;
        } else if (isSelected) {
          this.service.alreadyUsedRules.push(chipValue);
        }
        const label = val.id;
        let position = chips.map(chip => chip.label).lastIndexOf(label);
        position = position > -1 ? position + 1 : 0;
        chips.push({ label, isSelected, position });
      });

      chips = chips.filter(chip => chip.isSelected);
      chips.forEach((chip) => this.onDevolve(chip));
    });
    this.hasProposedRule = !!this.service.lastProposedRule?.id;
  }

  public init() {
    this._parse();
    this.impositive = this.chipLists.map(() => false);
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

  getSelect(position: number) {
    return this.impositive[position];
  }

  onDevolve(event: { label: string, isSelected: boolean, position: number }) {
    const id = this.config.values.filter(val => val.label === event.label)[0].key;

    const index = this.selecteds.map(sel => sel.id).indexOf(id);
    if (index < 0) {
      this.selecteds.push({ id, positions: [event.position] });
    } else {
      let positions = this.selecteds[index].positions;
      positions = positions || [];
      if (positions.includes(event.position)) {
        positions.splice(positions.indexOf(event.position), 1);
      } else {
        positions.push(event.position);
      }
      this.selecteds[index].positions = positions;
    }

    this.clicked.emit(this._map());
  }

  forceSelect(id: number) {
    this.impositive[id] = !this.impositive[id];
    const positions = this.impositive[id] ? this.chipLists[id].chipValue.map((chip, position) => position) : [];
    const key = this.chipLists[id].key;
    const index = this.selecteds.map(sel => sel.id).indexOf(key);
    if (index < 0) {
      this.selecteds.push({
        id: key,
        positions
      });
    } else {
      this.selecteds[index].positions = positions;
    }

    const mapping = this._map();
    this.clicked.emit(mapping);
  }

  private _map() {
    return this.selecteds.map(sel => {
      const chipList = this.chipLists.filter(cl => cl.key === sel.id)[0];
      const selecteds = sel.positions.map(pos => chipList.chipValue[pos]);
      return { title: sel.id, selecteds };
    })
      .map(item => {
        const chipList = this.chipLists.filter(cl => cl.key === item.title)[0];
        if (item.selecteds.length === chipList.chipValue.length) {
          return { title: item.title, selecteds: [chipList.fullValue] };
        }
        return item;
      });
  }

  private _parse() {
    this.chipLists = this.config.values.map(config => {
      let chipValue = [config.value];

      if (config.pattern.separators.length) {
        chipValue = ArrayUtils.magicSplit(chipValue[0], ...config.pattern.separators).filter(el => el !== ' ');
      }
      if (config.pattern.treatment) {
        chipValue = chipValue.filter(chip => config.pattern.treatment(chip) !== null);
      }
      if (config.pattern.sort) {
        chipValue = config.pattern.sort(chipValue);
      }

      return {
        pattern: this.parcialPattern(config.pattern),
        selectable: this.config.selectable,
        fullValue: config.value,
        label: config.label,
        key: config.key,
        chipValue
      };
    });
  }

  public async onContextMenu(e: MouseEvent) {
    if (this.hasProposedRule) {
      e.preventDefault();
      this.triggerButton.nativeElement.classList.remove('d-none');
      this.triggerButton.nativeElement.style.left = e.offsetX + 'px';
      this.triggerButton.nativeElement.style.top = e.offsetY + 'px';

      await TimeUtils.sleep(0);
      this.trigger.openMenu();
      await TimeUtils.sleep(0);

      this.triggerButton.nativeElement.classList.add('d-none');
    }
  }

  public ignoreSuggestion() {
    if (this.hasProposedRule) {
      this.service.ignoreSuggestion(this.service.lastProposedRule)
      .subscribe(() => {
        this.toast.show('Ótimo, esta sugestão não será mais apresentada à sua contabilidade', 'success');
      });
    }
  }

}
