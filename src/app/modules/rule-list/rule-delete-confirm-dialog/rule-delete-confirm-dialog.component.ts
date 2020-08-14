import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RuleService } from '@shared/services/rule.service';

@Component({
  templateUrl: './rule-delete-confirm-dialog.component.html'
})
export class RuleDeleteConfirmDialogComponent {

  isDeleting = false;

  constructor(
    public service: RuleService,
    public dialogRef: MatDialogRef<RuleDeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public ruleId: number
  ) {}

  confirm() {
    this.isDeleting = true;
    this.service.delete(this.ruleId).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

}
