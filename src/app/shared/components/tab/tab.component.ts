import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  classes: string[];

  ngOnInit(): void {
    this._resetClasses();
  }

  private _resetClasses() {
    this.classes = [
      'btn btn-outline-link col',
      'btn btn-outline-link col',
      'btn btn-outline-link col',
      'btn btn-outline-link col'
    ];
  }

  update(position: number) {
    this._resetClasses();
    this.classes[position] = 'btn btn-info col';
  }

}
