import { Component, OnInit } from '@angular/core';
import { BusinessService } from '@shared/services/business.service';

@Component({
  selector: 'app-tfilter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  word: string;
  suggestions: string[] = [];

  constructor(private _service: BusinessService) { }

  ngOnInit(): void {
    this._change();
  }

  private _change() {
    this._service
      .getBusiness('')
      .subscribe(data => {
        console.log(data);
        data.records.forEach(record => {
          this.suggestions.push(record.razaoSocial);
        });
      });
  }

}
