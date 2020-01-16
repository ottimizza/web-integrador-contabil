import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() description: string;
  isOpen: boolean;

  ngOnInit(): void {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

}
