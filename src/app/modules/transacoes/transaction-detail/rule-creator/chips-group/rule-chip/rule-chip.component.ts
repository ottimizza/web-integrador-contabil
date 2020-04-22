import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

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
export class RuleChipComponent implements OnChanges {

  @Input() treatment: (chip: string) => string;
  @Input() chip: string;
  @Input() label: string;
  @Input() forceSelect: boolean;
  @Input() position: number;

  @Output() select: EventEmitter<{ label: string, isSelected: boolean, position: number }> = new EventEmitter();

  isSelected = false;

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (changes.hasOwnProperty(key) && key === 'forceSelect') {
        this.isSelected = !this.forceSelect;
        this.selectThis();
      }
    }
  }

  selectThis() {
    this.isSelected = !this.isSelected;
    this.select.emit({ label: this.label, isSelected: this.isSelected, position: this.position });
  }

}
