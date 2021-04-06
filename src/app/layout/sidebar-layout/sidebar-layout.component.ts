import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/User';

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

  ngOnInit() {
    this.items = [
      // { id: 'sidebar-item-regras-sugeridas', icon: 'fad fa-question', label: 'Regras Sugeridas', url: '/dashboard/suggestions' },
      { id: 'sidebar-item-ultima-digitacao', icon: 'fad fa-typewriter', label: 'Última Digitação', url: '/dashboard/entrys' },
      { id: 'sidebar-item-regras', icon: 'fad fa-list-ol', label: 'Regras', url: '/dashboard/rules' },
      { id: 'sidebar-item-historicos', icon: 'fad fa-history', label: 'Históricos', url: '/dashboard/historics'},
      { id: 'sidebar-item-fluxo-planilhas', icon: 'fad fa-industry-alt', label: 'Empresas', url: '/dashboard/workflow' }
    ];
  }
}
