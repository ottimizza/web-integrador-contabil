import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() description: string;
  @Input() important = true;
  isOpen: boolean;

  ngOnInit(): void {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

}
