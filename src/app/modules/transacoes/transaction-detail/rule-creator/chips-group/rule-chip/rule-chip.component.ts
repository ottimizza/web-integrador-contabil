import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { ProposedRulesService } from '@app/http/proposed-rules/proposed-rules.service';

@Component({
  selector: 'app-rule-chip',
  templateUrl: './rule-chip.component.html',
  styles: [`
  .simple-chip {
    border: none;
    background-color: white;
    color: black;
    cursor: pointer;
  }
  .chip-selected {
    font-weight: bold;
    color: #00c853;
  }
  `]
})
export class RuleChipComponent implements OnChanges, OnInit {

  @Input()
  public treatment: (chip: string) => string;

  @Input()
  public selectable: boolean;

  @Input()
  public chip: string;

  @Input()
  public label: string;

  @Input()
  public forceSelect: boolean;

  @Input()
  public position: number;

  @Input()
  public divisors: string[];

  @Output() select = new EventEmitter<{ label: string, isSelected: boolean, position: number }>();

  isSelected = false;

  constructor(private service: ProposedRulesService) {
  }

  ngOnInit(): void {
    const exceptions = ['Banco'];
    if (!exceptions.includes(this.label)) {
      this.service.ruleProposed(this.chip, this.divisors, (rule) => {
        this.selectThis();
        // this.isSelected = true;
        this.service.onRuleUsed(rule);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {

      if (changes.hasOwnProperty(key) && key === 'forceSelect') {
        this.isSelected = this.forceSelect;
      }
    }
  }

  selectThis() {
    this.isSelected = !this.isSelected;
    this.select.emit({ label: this.label, isSelected: this.isSelected, position: this.position });
  }

}
