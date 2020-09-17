import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { User } from '@shared/models/User';
import { environment } from '@env';
// import { OverlayContainer } from '@angular/cdk/overlay';

// import { ThemeService } from '@app/service/theme.service';

export interface SidebarItem {
  id: string;
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

  constructor(
    @Inject(DOCUMENT) public document: Document
  ) { }

  ngOnInit() {
    this.items = [
      { id: 'sidebar-item-fluxo-planilhas', icon: 'fad fa-file-spreadsheet', label: 'Projetos', url: '/dashboard/workflow' },
      { id: 'sidebar-item-ultima-digitacao', icon: 'fad fa-typewriter', label: 'Última Digitação', url: '/dashboard/entrys' },
      { id: 'sidebar-item-regras', icon: 'fad fa-list-ol', label: 'Regras', url: '/dashboard/rules' },
      { id: 'sidebar-item-historicos', icon: 'fad fa-history', label: 'Históricos', url: '/dashboard/historics'},
    ];
  }
}
