import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RuleService } from '@shared/services/rule.service';
import { RuleType } from '@shared/models/Rule';
import { HistoricService } from '@shared/services/historic.service';

@Component({
  templateUrl: './rule-delete-confirm-dialog.component.html'
})
export class RuleDeleteConfirmDialogComponent {

  isDeleting = false;

  constructor(
    public ruleService: RuleService,
    public historicService: HistoricService,
    public dialogRef: MatDialogRef<RuleDeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, type: RuleType }
  ) {}

  confirm() {
    this.isDeleting = true;
    const del$ = this.data.type === RuleType.RULE ? this.ruleService.delete(this.data.id) : this.historicService.delete(this.data.id);
    del$.subscribe(() => {
      this.dialogRef.close(true);
    });
  }

}
