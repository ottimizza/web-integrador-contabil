import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'better-info',
  templateUrl: './better-info.component.html',
  styleUrls: ['./better-info.component.scss']
})
export class BetterInfoComponent implements OnInit {

  @Input() type:
  | 'success'
  | 'danger'
  | 'warning'
  | 'info' = 'info';
  @Input() align: 'left' | 'right' | 'center' | 'justify' = 'left';

  public icon = '';

  ngOnInit(): void {
    this.icon = this._discoverIcon();
  }

  private _discoverIcon() {
    switch (this.type) {
      case 'danger':  return 'exclamation-circle';
      case 'info':    return 'info-circle';
      case 'success': return 'check-circle';
      case 'warning': return 'exclamation-triangle';
    }
  }

}
