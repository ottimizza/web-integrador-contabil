import { Component, Input, OnInit } from '@angular/core';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {

  @Input() value: string;
  @Input() main = false;
}
