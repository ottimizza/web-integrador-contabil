import { Component, OnInit, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
// import { OverlayContainer } from '@angular/cdk/overlay';

// import { ThemeService } from '@app/service/theme.service';

export interface SidebarItem {
  icon: string;
  label: string;
  url: string;
}

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent implements OnInit {

  public items: SidebarItem[];

  constructor(@Inject(DOCUMENT) public document: Document) { }

  public hide(e) {
    this.document.getElementsByTagName('body')[0].classList.remove('show-sidebar');
  }

  ngOnInit() {
    this.items = [
      { icon: 'fad fa-file-spreadsheet', label: 'Última Digitação', url: '/dashboard/index' },
      { icon: 'fad fa-layer-plus', label: 'Nova Regra', url: '/regras/nova' }
    ];
  }
}
