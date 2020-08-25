
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SearchRule } from './models/SearchRule';
import { HackingRule } from './models/HackingRule';
import { SearchOption } from './models/SearchOption';

@Component({
  selector: 'app-complex-search-input',
  templateUrl: './complex-search.component.html',
})
export class ComplexSearchInputComponent implements OnInit {

  @Input()
  public debounceTime: number = 300;

  @Input()
  public defaultRule: SearchRule;

  @Input()
  public hackings: Array<HackingRule> = new Array<HackingRule>();

  @Input()
  public rules: Array<SearchRule> = new Array<SearchRule>();

  @Input()
  public isFetching: boolean;

  @Output()
  filterApplied: EventEmitter<SearchOption> = new EventEmitter();

  @Output()
  valueChanged: EventEmitter<string> = new EventEmitter();

  public form: FormGroup;

  public options: Array<SearchOption> = new Array<SearchOption>();

  constructor(public formBuilder: FormBuilder) { }

  public clear(): void {
    this.options = new Array<any>();
  }

  public show(input): void {
    this.clear();
    this.rules.forEach((rule: SearchRule) => this.options.push(rule));
    setTimeout(() => { input.focus(); }, 200);
  }

  public apply(option: SearchOption): void {
    this.filterApplied.emit(option);
  }

  private applyHackings(value: string): void {
    this.options = this.options.concat(...HackingRule.apply(value, this.hackings))
  }

  private apllyRules(value: string): void {
    this.options = this.options.concat(...SearchRule.apply(value, this.rules))
  }

  private applyDefault(value: string): void {
    if (this.defaultRule) {
      let description = this.format(this.defaultRule.description, value);
      for (let key in this.defaultRule.value) {
        if (Object.prototype.hasOwnProperty.call(this.defaultRule.value, key)) {
          this.defaultRule.value[key] = value;
        }
      }
      this.options.push({
        id: 'default', value: this.defaultRule.value,
        description: description
      });
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({ search: [''] });
    this.form.get('search').valueChanges.pipe(
      debounceTime(this.debounceTime)
    ).subscribe((value: string) => {
      if (value) {
        // this.valueChanged.emit(value);
        this.clear();
        this.applyHackings(`${value}`);
        this.apllyRules(`${value}`);
        this.applyDefault(`${value}`);
      }
    });
  }

  private format(text: string, ...args: any[]) {
    return text.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  }

}
