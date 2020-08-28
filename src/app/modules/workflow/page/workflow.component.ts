import { Component, OnInit } from '@angular/core';
import { ActionButton, HexColor } from '@shared/components/action-buttons/action-buttons.component';
import { environment } from '@env';

@Component({
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})

export class WorkflowComponent implements OnInit {

  public button: ActionButton = {
    id: 'new-script',
    icon: 'fad fa-file-spreadsheet',
    label: 'Criar Roteiro',
    color: new HexColor(environment.theme.primaryColor)
  };

  ngOnInit() {
  }

  create() {
  }
}
