import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RuleCreateFormat } from '@shared/models/Rule';

@Component({
  templateUrl: './rule-edit-modal.component.html',
  styleUrls: ['./rule-edit-modal.component.scss']
})
export class RuleEditModalComponent implements OnInit {

  rules: RuleCreateFormat;

  constructor(
    public dialogRef: MatDialogRef<RuleEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { rules: RuleCreateFormat }
  ) { }

  ngOnInit(): void {
    this.rules = this.data.rules;
  }

  get info() {
    return {
      remove: 'Remover esta linha da regra'
    };
  }

  onNoClick() {
    this.dialogRef.close();
  }

  remove(id: number) {
    this.rules.regras.splice(id, 1);
  }

}
